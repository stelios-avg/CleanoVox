import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n/LanguageContext';
import type { TranslationKey } from '../i18n/translations';
import { supabase } from '../lib/supabase';
import { navigateToBookingCompleted } from '../navigation/root-navigation';
import { listMyBookings } from '../services/bookings';
import {
  cancelArrivalReminder,
  formatArrivalWhen,
  isWithinArrivalReminderWindow,
  parseNoticeData,
  presentArrivalNotice,
  presentCompletedNotice,
  registerPushNotifications,
  remotePushWorks,
  savePushTokenToProfile,
  scheduleArrivalReminder,
} from '../services/notifications';

let handledResponseId: string | null = null;

function openFromNotice(data: unknown) {
  const parsed = parseNoticeData(data);
  if (!parsed || parsed.type !== 'booking_completed') {
    return;
  }
  navigateToBookingCompleted({
    bookingId: parsed.bookingId,
    serviceDate: parsed.serviceDate,
    timeSlot: parsed.timeSlot,
    address: parsed.address,
  });
}

function addressLine(
  t: (key: TranslationKey, params?: Record<string, string>) => string,
  address?: string | null
) {
  const trimmed = address?.trim();
  return trimmed ? t('notify.addressLine', { address: trimmed }) : '';
}

/** Registers for notifications and shows a local banner when an admin accepts or completes a visit. */
export function BookingNotifications() {
  const { session } = useAuth();
  const { t, locale } = useI18n();
  const seen = useRef(new Set<string>());

  useEffect(() => {
    let alive = true;
    void (async () => {
      const token = await registerPushNotifications();
      if (!alive) {
        return;
      }
      if (token && session?.userId) {
        await savePushTokenToProfile(session.userId, token);
      }
      if (!session?.userId || remotePushWorks()) {
        return;
      }
      try {
        const rows = await listMyBookings();
        if (!alive) {
          return;
        }
        for (const booking of rows) {
          if (booking.status === 'accepted' && booking.arrival_time && booking.service_date) {
            const line = addressLine(t, booking.contact_address);
            await scheduleArrivalReminder({
              bookingId: booking.id,
              serviceDate: booking.service_date,
              arrivalTime: booking.arrival_time,
              address: booking.contact_address,
              title: t('notify.reminderTitle'),
              body: t('notify.reminderBody', { time: booking.arrival_time, addressLine: line }),
            });
          } else {
            await cancelArrivalReminder(booking.id);
          }
        }
      } catch {
        // Local reminder backup is best-effort.
      }
    })();
    return () => {
      alive = false;
    };
  }, [locale, session?.userId, t]);

  useEffect(() => {
    const handle = (response: Notifications.NotificationResponse | null) => {
      if (!response) {
        return;
      }
      const id = response.notification.request.identifier;
      if (handledResponseId === id) {
        return;
      }
      handledResponseId = id;
      openFromNotice(response.notification.request.content.data);
      Notifications.clearLastNotificationResponse();
    };

    handle(Notifications.getLastNotificationResponse());
    const subscription = Notifications.addNotificationResponseReceivedListener(handle);
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('booking-status-notice')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'bookings' },
        (payload) => {
          const next = payload.new as {
            id?: string;
            user_id?: string | null;
            status?: string;
            service_date?: string;
            arrival_time?: string | null;
            time_slot?: string;
            contact_address?: string;
          };
          if (!next.id || !next.status) {
            return;
          }
          if (!session?.userId || next.user_id !== session.userId) {
            return;
          }

          if (
            next.status === 'cancelled' ||
            next.status === 'rejected' ||
            next.status === 'completed'
          ) {
            void cancelArrivalReminder(next.id);
          }

          const key = `${next.id}:${next.status}`;
          if (seen.current.has(key)) {
            return;
          }

          const useLocalBackup = !remotePushWorks();
          const line = addressLine(t, next.contact_address);

          if (next.status === 'accepted' && next.arrival_time && next.service_date) {
            seen.current.add(key);
            if (!useLocalBackup) {
              return;
            }
            const when = formatArrivalWhen(next.service_date, next.arrival_time, locale);
            const inWindow = isWithinArrivalReminderWindow(next.service_date, next.arrival_time);
            if (inWindow) {
              void scheduleArrivalReminder({
                bookingId: next.id,
                serviceDate: next.service_date,
                arrivalTime: next.arrival_time,
                address: next.contact_address,
                title: t('notify.reminderTitle'),
                body: t('notify.reminderBody', { time: next.arrival_time, addressLine: line }),
                presentIfDue: true,
              });
            } else {
              void presentArrivalNotice({
                bookingId: next.id,
                serviceDate: next.service_date,
                arrivalTime: next.arrival_time,
                locale,
                title: t('notify.arrivalTitle'),
                body: t('notify.arrivalBody', { when, addressLine: line }),
                address: next.contact_address,
              });
              void scheduleArrivalReminder({
                bookingId: next.id,
                serviceDate: next.service_date,
                arrivalTime: next.arrival_time,
                address: next.contact_address,
                title: t('notify.reminderTitle'),
                body: t('notify.reminderBody', { time: next.arrival_time, addressLine: line }),
              });
            }
            return;
          }

          if (next.status === 'completed') {
            seen.current.add(key);
            navigateToBookingCompleted({
              bookingId: next.id,
              serviceDate: next.service_date,
              timeSlot: next.time_slot,
              address: next.contact_address,
            });
            if (useLocalBackup) {
              void presentCompletedNotice({
                bookingId: next.id,
                title: t('notify.completedTitle'),
                body: t('notify.completedBody'),
                serviceDate: next.service_date,
                timeSlot: next.time_slot,
                address: next.contact_address,
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [locale, session?.userId, t]);

  return null;
}
