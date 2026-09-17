import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useStripe } from '@stripe/stripe-react-native';
import { Ionicons } from '@expo/vector-icons';
import { Heading, PillButton, Subtitle } from '../../components/ui';
import {
  CURRENCY_CODE,
  MERCHANT_COUNTRY_CODE,
  MERCHANT_NAME,
  STRIPE_PUBLISHABLE_KEY,
  SERVICE_FEE_CENTS,
  bookingGrandTotalCents,
  formatEuros,
} from '../../constants/payments';
import { useI18n } from '../../i18n/LanguageContext';
import { createBooking } from '../../services/bookings';
import { uploadBookingPhotos } from '../../services/bookingPhotos';
import { createPaymentIntent } from '../../services/payments';
import { colors, fonts, radii, spacing } from '../../theme';
import type { BookingStackParamList, RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<BookingStackParamList, 'Payment'>;

/** One tappable consent row: checkbox + label. Required before paying. */
function ConsentRow({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <Pressable style={styles.consentRow} onPress={onToggle} hitSlop={6}>
      <Ionicons
        name={checked ? 'checkbox' : 'square-outline'}
        size={22}
        color={checked ? colors.accent : colors.textSecondary}
      />
      <Text style={styles.consentText}>{label}</Text>
    </Pressable>
  );
}

export default function PaymentScreen({ navigation, route }: Props) {
  const { t } = useI18n();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const amount = bookingGrandTotalCents(
    route.params.option,
    route.params.extraHours,
    route.params.squareMeters,
    route.params.rooms,
    route.params.supplies ?? [],
    route.params.pieces,
    route.params.extras,
    route.params.plan
  );

  const [processing, setProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [withdrawalAccepted, setWithdrawalAccepted] = useState(false);
  const consentsGiven = termsAccepted && withdrawalAccepted;
  const stripeReady = STRIPE_PUBLISHABLE_KEY.startsWith('pk_');

  const saveAndConfirm = async (paymentIntentId?: string | null) => {
    const photoPaths = await uploadBookingPhotos(route.params.photos ?? []);
    await createBooking({
      ...route.params,
      photoPaths,
      status: 'paid',
      paymentIntentId: paymentIntentId ?? null,
    });
    navigation.replace('Confirmation', route.params);
  };

  const pay = async () => {
    if (!stripeReady) {
      Alert.alert(t('payment.unavailableTitle'), t('payment.missingKey'));
      return;
    }
    setProcessing(true);
    try {
      const intent = await createPaymentIntent(route.params);
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: MERCHANT_NAME,
        paymentIntentClientSecret: intent.clientSecret,
        defaultBillingDetails: {
          name: route.params.contact.name,
          email: route.params.contact.email || undefined,
          phone: route.params.contact.phone,
        },
        applePay: { merchantCountryCode: MERCHANT_COUNTRY_CODE },
        googlePay: {
          merchantCountryCode: MERCHANT_COUNTRY_CODE,
          testEnv: !STRIPE_PUBLISHABLE_KEY.startsWith('pk_live'),
          currencyCode: CURRENCY_CODE,
        },
      });
      if (initError) {
        Alert.alert(t('payment.failedTitle'), initError.message);
        return;
      }
      const { error: presentError } = await presentPaymentSheet();
      if (presentError) {
        if (presentError.code !== 'Canceled') {
          Alert.alert(t('payment.failedTitle'), presentError.message);
        }
        return;
      }
      await saveAndConfirm(intent.paymentIntentId);
    } catch (e) {
      Alert.alert(t('payment.unavailableTitle'), (e as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  const simulatePay = async () => {
    setProcessing(true);
    try {
      await saveAndConfirm(`sim_${Date.now()}`);
    } catch (e) {
      Alert.alert(t('payment.unavailableTitle'), (e as Error).message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.root}>
      <View>
        <Heading>{t('payment.title')}</Heading>
        <Subtitle>{t('payment.subtitle')}</Subtitle>
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>{t('payment.total')}</Text>
        <Text style={styles.totalValue}>{formatEuros(amount)}</Text>
        <Text style={styles.totalMeta}>
          {t('summary.serviceFee')} · {formatEuros(SERVICE_FEE_CENTS)}
        </Text>
        <Text style={styles.totalMeta}>
          {t(`service.${route.params.option}`)} · {route.params.date} ·{' '}
          {route.params.timeSlots && new Set(route.params.timeSlots).size > 1
            ? t('summary.perVisit')
            : route.params.timeSlot}
          {route.params.dates && route.params.dates.length > 1
            ? ` · ${route.params.dates.length}`
            : ''}
        </Text>
        <Text style={styles.totalMeta}>
          {route.params.contact.name}
          {route.params.contact.phone ? ` · ${route.params.contact.phone}` : ''}
        </Text>
        {route.params.contact.email ? (
          <Text style={styles.totalMeta}>{route.params.contact.email}</Text>
        ) : null}
        <Text style={styles.totalMeta}>{route.params.contact.address}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.consentCard}>
          <ConsentRow
            checked={termsAccepted}
            onToggle={() => setTermsAccepted((v) => !v)}
            label={t('payment.acceptTerms')}
          />
          <ConsentRow
            checked={withdrawalAccepted}
            onToggle={() => setWithdrawalAccepted((v) => !v)}
            label={t('payment.acceptWithdrawal')}
          />
          <Text style={styles.consentLinks}>
            <Text
              style={styles.consentLink}
              onPress={() => rootNavigation.navigate('LegalDoc', { doc: 'terms' })}
            >
              {t('legal.terms')}
            </Text>
            {'  ·  '}
            <Text
              style={styles.consentLink}
              onPress={() => rootNavigation.navigate('LegalDoc', { doc: 'cancellation' })}
            >
              {t('legal.cancellation')}
            </Text>
          </Text>
          <Text style={styles.consentNote}>{t('payment.cancellationNote')}</Text>
        </View>
        <PillButton
          label={processing ? t('auth.pleaseWait') : t('payment.pay')}
          onPress={pay}
          disabled={processing || !consentsGiven}
        />
        {__DEV__ ? (
          <PillButton
            label={t('payment.simulate')}
            variant="outline"
            onPress={simulatePay}
            disabled={processing || !consentsGiven}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.screen,
    justifyContent: 'space-between',
  },
  totalCard: {
    backgroundColor: colors.ink,
    borderRadius: radii.card,
    padding: 26,
    gap: 6,
  },
  totalLabel: {
    color: colors.textOnDarkMuted,
    fontSize: 14,
    fontFamily: fonts.semiBold,
  },
  totalValue: {
    color: colors.textOnDark,
    fontSize: 42,
    fontFamily: fonts.extraBold,
    letterSpacing: -1,
  },
  totalMeta: {
    color: colors.textOnDarkMuted,
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  footer: {
    paddingBottom: 10,
    gap: 10,
  },
  consentCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    padding: 14,
    gap: 10,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  consentText: {
    flex: 1,
    fontSize: 12.5,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  consentLinks: {
    fontSize: 12.5,
    fontFamily: fonts.semiBold,
  },
  consentLink: {
    color: colors.accent,
  },
  consentNote: {
    fontSize: 12,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    lineHeight: 17,
  },
});
