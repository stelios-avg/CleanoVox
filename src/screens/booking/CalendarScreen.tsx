import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { PillButton } from '../../components/ui';
import { PressableScale } from '../../components/PressableScale';
import {
  ALL_DAY_DURATION_HOURS,
  BASE_DURATION_HOURS,
  DAY_START_HOUR,
  allDayExtraHours,
  getSlotStartHours,
  isAllDayTaken,
  isSlotStartPassed,
  isSlotTaken,
  maxExtraHoursWithBookings,
  slotLabel,
  type BookedRange,
} from '../../constants/booking';
import {
  countBookableDaysInMonth,
  datesInMonthForWeekdays,
  visitsPerMonth,
} from '../../constants/plans';
import { getClosedSlots } from '../../services/bookings';
import { checkServiceArea, type ServiceAreaStatus } from '../../services/serviceArea';
import { supabase } from '../../lib/supabase';
import { useI18n } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';
import { categoryFor } from '../../navigation/types';
import { colors, fonts, radii, spacing } from '../../theme';
import type { BookingStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<BookingStackParamList, 'Calendar'>;

const FREQ_KEY: Record<1 | 2 | 3, TranslationKey> = {
  1: 'plans.freq1',
  2: 'plans.freq2',
  3: 'plans.freq3',
};

/** Local (not UTC) YYYY-MM-DD, so days don't shift across timezones. */
function toISODate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Month grid cells, Monday-first, padded with nulls to full weeks. */
function getMonthGrid(year: number, month: number): (Date | null)[] {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(offset).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  return cells;
}

function Chip({
  label,
  selected,
  onPress,
  disabled,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      scaleTo={0.96}
      style={[
        styles.chip,
        selected && styles.chipSelected,
        disabled && styles.chipDisabled,
      ]}
    >
      <Text
        style={[
          styles.chipLabel,
          selected && styles.chipLabelSelected,
          disabled && styles.chipLabelDisabled,
        ]}
      >
        {label}
      </Text>
    </PressableScale>
  );
}

export default function CalendarScreen({ navigation, route }: Props) {
  const { t, locale } = useI18n();
  const insets = useSafeAreaInsets();
  const { option, rooms, squareMeters, pieces, plan, preferredCleaner } = route.params;
  const isPlan = plan != null;
  const visitsNeeded = plan ? visitsPerMonth(plan.frequency) : 1;

  const duration = plan?.visitHours ?? BASE_DURATION_HOURS[option];
  const slotStartHours = useMemo(() => getSlotStartHours(duration), [duration]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = today;

  const [monthCursor, setMonthCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [weekdayPicks, setWeekdayPicks] = useState<number[]>([]);
  const [startHour, setStartHour] = useState<number | null>(null);
  /** Plan bookings: pick one time for all visits or one per visit. */
  const [perDayTimes, setPerDayTimes] = useState(false);
  const [perDaySlots, setPerDaySlots] = useState<Record<string, number>>({});
  const [allDay, setAllDay] = useState(false);
  const [extraHours, setExtraHours] = useState(0);
  const [bookedByIso, setBookedByIso] = useState<Record<string, BookedRange[]>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [areaStatus, setAreaStatus] = useState<ServiceAreaStatus | 'checking'>(
    'checking'
  );
  const runAreaCheck = useCallback(() => {
    setAreaStatus('checking');
    checkServiceArea().then(setAreaStatus);
  }, []);
  useEffect(() => {
    runAreaCheck();
  }, [runAreaCheck]);

  const selectedKey = selectedDates.map(toISODate).sort().join(',');
  const selected = selectedDates[selectedDates.length - 1] ?? null;
  const bookedRanges = useMemo(
    () => Object.values(bookedByIso).flat(),
    [bookedByIso]
  );

  useEffect(() => {
    if (selectedDates.length === 0) {
      setBookedByIso({});
      return;
    }
    let stale = false;
    setLoadingSlots(true);
    Promise.all(
      selectedDates.map(async (day) => {
        const iso = toISODate(day);
        const ranges = await getClosedSlots(iso).catch(() => [] as BookedRange[]);
        return [iso, ranges] as const;
      })
    )
      .then((rows) => {
        if (stale) {
          return;
        }
        const next: Record<string, BookedRange[]> = {};
        for (const [iso, ranges] of rows) {
          next[iso] = ranges;
        }
        setBookedByIso(next);
      })
      .finally(() => {
        if (!stale) {
          setLoadingSlots(false);
        }
      });
    return () => {
      stale = true;
    };
  }, [selectedKey]);

  useEffect(() => {
    if (isPlan || !selected) {
      return;
    }
    const iso = toISODate(selected);
    const channel = supabase
      .channel(`closed-slots-${iso}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'closed_slots', filter: `service_date=eq.${iso}` },
        () => {
          void getClosedSlots(iso)
            .then((ranges) => setBookedByIso({ [iso]: ranges }))
            .catch(() => {});
        }
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [isPlan, selected]);

  const year = monthCursor.getFullYear();
  const month = monthCursor.getMonth();
  const grid = useMemo(() => getMonthGrid(year, month), [year, month]);
  const bookableInMonth = useMemo(
    () => countBookableDaysInMonth(year, month, minDate),
    [year, month, minDate]
  );
  const monthTooShort = isPlan && bookableInMonth < visitsNeeded;

  const atCurrentMonth =
    year === today.getFullYear() && month === today.getMonth();

  const weekdayLabels = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) =>
      new Date(2024, 0, 1 + i)
        .toLocaleDateString(locale, { weekday: 'short' })
        .replace('.', '')
    );
  }, [locale]);

  const monthTitle = monthCursor.toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  });

  const applyWeekdays = (picks: number[]) => {
    setWeekdayPicks(picks);
    if (!plan || picks.length !== plan.frequency) {
      return;
    }
    setSelectedDates(datesInMonthForWeekdays(year, month, picks, visitsNeeded, minDate));
    setStartHour(null);
    setPerDaySlots({});
    setAllDay(false);
    setExtraHours(0);
  };

  const changeMonth = (delta: number) => {
    const next = new Date(year, month + delta, 1);
    setMonthCursor(next);
    if (isPlan && weekdayPicks.length === (plan?.frequency ?? 0)) {
      setSelectedDates(
        datesInMonthForWeekdays(
          next.getFullYear(),
          next.getMonth(),
          weekdayPicks,
          visitsNeeded,
          minDate
        )
      );
      setStartHour(null);
      setPerDaySlots({});
      setAllDay(false);
      setExtraHours(0);
      return;
    }
    if (isPlan) {
      setSelectedDates([]);
      setStartHour(null);
      setPerDaySlots({});
      setAllDay(false);
      setExtraHours(0);
    }
  };

  const toggleWeekday = (jsDay: number) => {
    if (!isPlan || !plan) {
      return;
    }
    const exists = weekdayPicks.includes(jsDay);
    const next = exists
      ? weekdayPicks.filter((day) => day !== jsDay)
      : weekdayPicks.length >= plan.frequency
        ? [...weekdayPicks.slice(1), jsDay]
        : [...weekdayPicks, jsDay];
    applyWeekdays(next);
  };

  const pickDay = (day: Date) => {
    if (!isPlan) {
      setSelectedDates([day]);
      setStartHour(null);
      setAllDay(false);
      setExtraHours(0);
      setBookedByIso({});
      return;
    }
    const iso = toISODate(day);
    setWeekdayPicks([]);
    setPerDaySlots((prev) => {
      if (!(iso in prev)) {
        return prev;
      }
      const { [iso]: _removed, ...rest } = prev;
      return rest;
    });
    setSelectedDates((prev) => {
      const sameMonth =
        prev.length === 0 ||
        (prev[0].getFullYear() === day.getFullYear() && prev[0].getMonth() === day.getMonth());
      const base = sameMonth ? prev : [];
      if (base.some((item) => toISODate(item) === iso)) {
        return base.filter((item) => toISODate(item) !== iso);
      }
      if (base.length >= visitsNeeded) {
        return base;
      }
      return [...base, day].sort((a, b) => a.getTime() - b.getTime());
    });
  };

  const pickSlot = (hour: number) => {
    setAllDay(false);
    setStartHour(hour);
    setExtraHours(0);
  };

  const pickAllDay = () => {
    setAllDay(true);
    setStartHour(DAY_START_HOUR);
    setExtraHours(allDayExtraHours(duration));
  };

  const selectedPretty = selected?.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const slotBlockedOn = (iso: string, hour: number) => {
    const ranges = bookedByIso[iso] ?? [];
    return isSlotTaken(hour, duration, ranges) || isSlotStartPassed(iso, hour);
  };

  const slotBlocked = (hour: number) =>
    selectedDates.some((day) => slotBlockedOn(toISODate(day), hour));

  const maxExtra =
    startHour !== null && !allDay && !isPlan
      ? maxExtraHoursWithBookings(startHour, duration, bookedRanges)
      : 0;
  useEffect(() => {
    if (allDay) {
      return;
    }
    setExtraHours((v) => Math.min(v, maxExtra));
  }, [maxExtra, allDay]);

  const totalHours = allDay ? ALL_DAY_DURATION_HOURS : duration + extraHours;
  const allSlotsTaken =
    selectedDates.length > 0 &&
    !loadingSlots &&
    slotStartHours.every((hour) => slotBlocked(hour));

  const allDayTaken =
    isPlan ||
    selectedDates.some((day) => isAllDayTaken(toISODate(day), bookedByIso[toISODate(day)] ?? []));
  const nothingAvailable = allSlotsTaken && allDayTaken;
  const datesReady = selectedDates.length === visitsNeeded;

  const sortedIsos = useMemo(
    () =>
      [...selectedDates]
        .sort((a, b) => a.getTime() - b.getTime())
        .map(toISODate),
    [selectedKey]
  );
  const usePerDay = isPlan && perDayTimes;
  const perDayReady =
    usePerDay &&
    sortedIsos.every(
      (iso) => perDaySlots[iso] != null && !slotBlockedOn(iso, perDaySlots[iso])
    );
  const timeReady = usePerDay ? perDayReady : startHour !== null;

  const togglePerDay = (next: boolean) => {
    setPerDayTimes(next);
    setStartHour(null);
    setPerDaySlots({});
    setAllDay(false);
    setExtraHours(0);
  };

  const handleContinue = () => {
    if (!datesReady || !timeReady) {
      return;
    }
    const dates = sortedIsos;
    if (usePerDay) {
      if (dates.some((iso) => isSlotStartPassed(iso, perDaySlots[iso]))) {
        setPerDaySlots({});
        return;
      }
    } else if (startHour === null || dates.some((iso) => isSlotStartPassed(iso, startHour))) {
      setStartHour(null);
      setAllDay(false);
      return;
    }
    const hours = isPlan
      ? duration
      : allDay
        ? ALL_DAY_DURATION_HOURS
        : duration + extraHours;
    const timeSlots = usePerDay
      ? dates.map((iso) => slotLabel(perDaySlots[iso], duration))
      : undefined;
    navigation.navigate('BookingSummary', {
      date: dates[0],
      dates: isPlan ? dates : undefined,
      timeSlot: timeSlots ? timeSlots[0] : slotLabel(startHour!, hours),
      timeSlots,
      category: categoryFor(option),
      option,
      rooms,
      squareMeters,
      pieces,
      extraHours: isPlan
        ? Math.max(0, duration - BASE_DURATION_HOURS[option])
        : allDay
          ? allDayExtraHours(BASE_DURATION_HOURS[option])
          : extraHours,
      plan,
      preferredCleaner,
    });
  };

  const extraChoices = Array.from({ length: maxExtra + 1 }, (_, i) => i);
  const hero =
    option === 'Events'
      ? require('../../../assets/images/service-crew.png')
      : option === 'Ironing'
        ? require('../../../assets/images/service-ironing.jpg')
        : require('../../../assets/images/service-home.png');

  if (areaStatus !== 'inside') {
    return (
      <View style={[styles.root, styles.areaCenter, { paddingTop: insets.top }]}>
        <PressableScale
          onPress={() => navigation.goBack()}
          style={[styles.roundBtn, styles.roundBtnStatic]}
          accessibilityLabel="Back"
        >
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </PressableScale>
        {areaStatus === 'checking' ? (
          <>
            <ActivityIndicator color={colors.accent} size="large" />
            <Text style={styles.areaBody}>{t('area.checking')}</Text>
          </>
        ) : (
          <>
            <View style={styles.areaIcon}>
              <Ionicons
                name={
                  areaStatus === 'outside'
                    ? 'location-outline'
                    : 'navigate-circle-outline'
                }
                size={36}
                color={colors.accent}
              />
            </View>
            <Text style={styles.areaTitle}>
              {areaStatus === 'outside'
                ? t('area.outsideTitle')
                : areaStatus === 'permission-denied'
                  ? t('area.deniedTitle')
                  : t('area.unavailableTitle')}
            </Text>
            <Text style={styles.areaBody}>
              {areaStatus === 'outside'
                ? t('area.outsideBody')
                : areaStatus === 'permission-denied'
                  ? t('area.deniedBody')
                  : t('area.unavailableBody')}
            </Text>
            <View style={styles.areaActions}>
              {areaStatus === 'permission-denied' ? (
                <PillButton
                  label={t('area.openSettings')}
                  onPress={() => Linking.openSettings()}
                />
              ) : null}
              <PillButton label={t('area.retry')} onPress={runAreaCheck} />
            </View>
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.root}
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroWrap}>
          <Image source={hero} style={styles.hero} resizeMode="cover" />
          <PressableScale
            onPress={() => navigation.goBack()}
            style={[styles.roundBtn, { top: insets.top + 8 }]}
            accessibilityLabel="Back"
          >
            <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
          </PressableScale>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.category}>
            {option === 'Ironing'
              ? t('services.ironing')
              : categoryFor(option) === 'my-home'
                ? t('services.myHome')
                : t('services.crew')}
          </Text>
          <Text style={styles.title}>{t(`service.${option}`).replace(/\n/g, '')}</Text>
          <Text style={styles.summaryMeta}>
            {option === 'Ironing'
              ? t('quote.piecesValue', { n: String(pieces ?? 0) })
              : `${squareMeters} m²${
                  option !== 'Events'
                    ? rooms > 0
                      ? ` · ${t('quote.chipRooms', { n: String(rooms) })}`
                      : ` · ${t('quote.chipStudio')}`
                    : ''
                }`}
            {` · ${t('quote.hoursValue', { n: String(duration) })}`}
            {plan
              ? ` · ${t(FREQ_KEY[plan.frequency])} · ${t('calendar.visitCount', { n: String(visitsNeeded) })}`
              : ''}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {isPlan ? t('calendar.pickDates') : t('calendar.pickDate')}
          </Text>
          {plan ? (
            <Text style={styles.slotsDate}>
              {t('calendar.planHint', {
                freq: t(FREQ_KEY[plan.frequency]),
                n: String(visitsNeeded),
                month: monthTitle,
              })}
            </Text>
          ) : null}
          <View style={styles.calendarCard}>
            <View style={styles.monthHeader}>
              <PressableScale
                onPress={() => changeMonth(-1)}
                disabled={atCurrentMonth}
                hitSlop={10}
                style={[styles.monthArrow, atCurrentMonth && { opacity: 0.25 }]}
              >
                <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
              </PressableScale>
              <Text style={styles.monthTitle}>{monthTitle}</Text>
              <PressableScale onPress={() => changeMonth(1)} hitSlop={10} style={styles.monthArrow}>
                <Ionicons name="chevron-forward" size={20} color={colors.textPrimary} />
              </PressableScale>
            </View>

            <View style={styles.weekRow}>
              {weekdayLabels.map((label, index) => {
                const jsDay = (index + 1) % 7;
                const picked = weekdayPicks.includes(jsDay);
                if (!isPlan) {
                  return (
                    <Text key={`${label}-${index}`} style={styles.weekdayLabel}>
                      {label}
                    </Text>
                  );
                }
                return (
                  <PressableScale
                    key={`${label}-${index}`}
                    onPress={() => toggleWeekday(jsDay)}
                    style={[styles.weekdayChip, picked && styles.weekdayChipOn]}
                  >
                    <Text style={[styles.weekdayLabel, picked && styles.weekdayLabelOn]}>
                      {label}
                    </Text>
                  </PressableScale>
                );
              })}
            </View>

            <View style={styles.grid}>
              {grid.map((day, i) => {
                if (!day) {
                  return <View key={`empty-${i}`} style={styles.dayCell} />;
                }
                const disabled = day < minDate;
                const isSelected = selectedDates.some(
                  (item) => toISODate(item) === toISODate(day)
                );
                const isToday = toISODate(day) === toISODate(today);
                return (
                  <View key={toISODate(day)} style={styles.dayCell}>
                    <PressableScale
                      disabled={disabled}
                      onPress={() => pickDay(day)}
                      scaleTo={0.88}
                      style={[
                        styles.dayCircle,
                        isToday && !isSelected && styles.dayToday,
                        isSelected && styles.daySelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayLabel,
                          disabled && styles.dayDisabled,
                          isSelected && styles.dayLabelSelected,
                        ]}
                      >
                        {day.getDate()}
                      </Text>
                    </PressableScale>
                  </View>
                );
              })}
            </View>
            {isPlan ? (
              <Text style={styles.planCount}>
                {t('calendar.planCount', {
                  picked: String(selectedDates.length),
                  n: String(visitsNeeded),
                })}
              </Text>
            ) : null}
            {monthTooShort ? (
              <Text style={styles.planWarn}>{t('calendar.monthTooShort')}</Text>
            ) : null}
          </View>
        </View>

        {selectedDates.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('calendar.slotsFor')}</Text>
            {isPlan ? (
              <View style={styles.chipWrap}>
                <Chip
                  label={t('calendar.sameTimeAll')}
                  selected={!perDayTimes}
                  onPress={() => togglePerDay(false)}
                />
                <Chip
                  label={t('calendar.perDayTimes')}
                  selected={perDayTimes}
                  onPress={() => togglePerDay(true)}
                />
              </View>
            ) : null}
            <Text style={styles.slotsDate}>
              {isPlan
                ? usePerDay
                  ? t('calendar.perDayHint')
                  : t('calendar.sameTime', { n: String(selectedDates.length) })
                : selectedPretty}
            </Text>
            {loadingSlots ? (
              <ActivityIndicator color={colors.accent} style={{ marginVertical: 16 }} />
            ) : usePerDay ? (
              <View style={{ gap: 14 }}>
                {sortedIsos.map((iso) => {
                  const pretty = new Date(`${iso}T12:00:00`).toLocaleDateString(locale, {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  });
                  const dayHours = slotStartHours.filter(
                    (hour) => !slotBlockedOn(iso, hour)
                  );
                  return (
                    <View key={iso} style={{ gap: 8 }}>
                      <Text style={styles.perDayLabel}>{pretty}</Text>
                      {dayHours.length === 0 ? (
                        <View style={styles.hintRow}>
                          <Ionicons
                            name="close-circle-outline"
                            size={18}
                            color={colors.textSecondary}
                          />
                          <Text style={styles.hintText}>{t('calendar.noSlots')}</Text>
                        </View>
                      ) : (
                        <View style={styles.chipWrap}>
                          {slotStartHours.map((hour) => (
                            <Chip
                              key={`${iso}-${hour}`}
                              label={slotLabel(hour, duration)}
                              selected={perDaySlots[iso] === hour}
                              disabled={slotBlockedOn(iso, hour)}
                              onPress={() =>
                                setPerDaySlots((prev) => ({ ...prev, [iso]: hour }))
                              }
                            />
                          ))}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            ) : nothingAvailable ? (
              <View style={styles.hintRow}>
                <Ionicons name="close-circle-outline" size={18} color={colors.textSecondary} />
                <Text style={styles.hintText}>{t('calendar.noSlots')}</Text>
              </View>
            ) : (
              <View style={styles.chipWrap}>
                {slotStartHours.map((hour) => {
                  const taken = slotBlocked(hour);
                  return (
                    <Chip
                      key={hour}
                      label={slotLabel(hour, duration)}
                      selected={startHour === hour && !allDay}
                      disabled={taken}
                      onPress={() => pickSlot(hour)}
                    />
                  );
                })}
                {isPlan ? null : (
                <Chip
                  label={t('calendar.allDay')}
                  selected={allDay}
                  disabled={allDayTaken}
                  onPress={pickAllDay}
                />
                )}
              </View>
            )}

            {allDay ? (
              <Text style={styles.slotsDate}>
                {slotLabel(DAY_START_HOUR, ALL_DAY_DURATION_HOURS)} · {ALL_DAY_DURATION_HOURS}{' '}
                {t('unit.hours')}
              </Text>
            ) : null}

            {startHour !== null && isPlan && !usePerDay ? (
              <Text style={styles.slotsDate}>
                {slotLabel(startHour, duration)} · {duration} {t('unit.hours')}
              </Text>
            ) : null}

            {startHour !== null && !allDay && !isPlan ? (
              <View style={{ gap: 10, marginTop: 8 }}>
                <Text style={styles.sectionTitle}>{t('calendar.extraHours')}</Text>
                <Text style={styles.slotsDate}>
                  {slotLabel(startHour, totalHours)} · {totalHours} {t('unit.hours')}
                </Text>
                <View style={styles.chipWrap}>
                  {extraChoices.map((hours) => (
                    <Chip
                      key={hours}
                      label={hours === 0 ? t('calendar.noExtra') : `+${hours}`}
                      selected={extraHours === hours}
                      onPress={() => setExtraHours(hours)}
                    />
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={[styles.section, styles.hintRow]}>
            <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.hintText}>
              {isPlan ? t('calendar.pickDaysHint') : t('calendar.pickDayHint')}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <PillButton
          label={t('calendar.continue')}
          onPress={handleContinue}
          disabled={!datesReady || !timeReady}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.page,
  },
  heroWrap: {
    height: 180,
    backgroundColor: colors.ink,
  },
  hero: {
    width: '100%',
    height: '100%',
  },
  roundBtn: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#101218',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  roundBtnStatic: {
    position: 'relative',
    left: 0,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  summaryCard: {
    marginTop: -28,
    marginHorizontal: 16,
    backgroundColor: colors.background,
    borderRadius: 24,
    padding: 18,
    gap: 4,
    shadowColor: '#101218',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  category: {
    fontSize: 13,
    fontFamily: fonts.semiBold,
    color: colors.accent,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.extraBold,
    color: colors.textPrimary,
  },
  summaryMeta: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.extraBold,
    color: colors.textPrimary,
  },
  calendarCard: {
    borderRadius: 22,
    backgroundColor: colors.background,
    padding: 14,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  monthArrow: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.page,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitle: {
    fontSize: 17,
    fontFamily: fonts.extraBold,
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekdayChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 10,
  },
  weekdayChipOn: {
    backgroundColor: colors.accentSoft,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fonts.bold,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  weekdayLabelOn: {
    color: colors.accent,
    flex: 0,
  },
  planCount: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  planWarn: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 13,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
  },
  perDayLabel: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  dayCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayToday: {
    borderWidth: 1.5,
    borderColor: colors.accent,
  },
  daySelected: {
    backgroundColor: colors.accent,
  },
  dayLabel: {
    fontSize: 15,
    fontFamily: fonts.semiBold,
    color: colors.textPrimary,
  },
  dayLabelSelected: {
    color: colors.textOnAccent,
    fontFamily: fonts.extraBold,
  },
  dayDisabled: {
    color: colors.border,
  },
  slotsDate: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    textTransform: 'capitalize',
    marginTop: -4,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
  },
  chipSelected: {
    backgroundColor: colors.accent,
  },
  chipDisabled: {
    backgroundColor: colors.surface,
  },
  chipLabel: {
    fontSize: 13,
    fontFamily: fonts.semiBold,
    color: colors.accent,
  },
  chipLabelSelected: {
    color: colors.textOnAccent,
    fontFamily: fonts.bold,
  },
  chipLabelDisabled: {
    color: colors.border,
    textDecorationLine: 'line-through',
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 14,
    borderRadius: radii.row,
    backgroundColor: colors.background,
  },
  hintText: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
  },
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: 12,
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  areaCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.screen * 1.5,
    gap: 12,
  },
  areaIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  areaTitle: {
    fontSize: 20,
    fontFamily: fonts.extraBold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  areaBody: {
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  areaActions: {
    alignSelf: 'stretch',
    gap: 10,
    marginTop: 10,
  },
});
