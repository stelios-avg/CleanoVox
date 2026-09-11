import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import { PillButton, SubpageHeader } from '../../components/ui';
import { useI18n } from '../../i18n/LanguageContext';
import {
  PRIVACY_CONTACT_EMAIL,
  PRIVACY_UPDATED,
  privacyProcessors,
  privacySections,
} from '../../legal/privacy';
import { colors, fonts, radii, spacing } from '../../theme';

export default function PrivacyScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<Record<string, undefined>>>();
  const { t, language } = useI18n();
  const insets = useSafeAreaInsets();
  const sections = privacySections(language);
  const processors = privacyProcessors(language);

  return (
    <View style={styles.root}>
      <SubpageHeader
        title={t('privacy.title')}
        onBack={() => navigation.goBack()}
        topInset={insets.top}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.lead}>{t('privacy.lead')}</Text>
        <Text style={styles.updated}>
          {t('privacy.updated', { date: PRIVACY_UPDATED })}
        </Text>

        {sections.map((section) => (
          <View key={section.title} style={styles.card}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            <Text style={styles.cardBody}>{section.body}</Text>
          </View>
        ))}

        <Text style={styles.sectionLabel}>{t('privacy.processors')}</Text>
        {processors.map((row) => (
          <View key={row.name} style={styles.card}>
            <Text style={styles.cardTitle}>{row.name}</Text>
            <Text style={styles.meta}>{row.role}</Text>
            <Text style={styles.meta}>{row.region}</Text>
            <Text style={styles.cardBody}>{row.data}</Text>
          </View>
        ))}

        <PillButton
          label={t('privacy.emailCta')}
          variant="outline"
          onPress={() => void Linking.openURL(`mailto:${PRIVACY_CONTACT_EMAIL}`)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.screen,
    paddingBottom: 32,
    gap: 12,
  },
  lead: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  updated: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: colors.textSecondary,
  },
  sectionLabel: {
    marginTop: 8,
    fontSize: 13,
    fontFamily: fonts.bold,
    color: colors.textSecondary,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  card: {
    borderRadius: radii.card,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.textPrimary,
  },
  cardBody: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  meta: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
});
