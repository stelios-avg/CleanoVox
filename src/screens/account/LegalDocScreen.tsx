import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import { PillButton, SubpageHeader } from '../../components/ui';
import { useI18n } from '../../i18n/LanguageContext';
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_EFFECTIVE_DATE,
  legalDocSections,
} from '../../legal/documents';
import type { LegalDocId } from '../../legal/documents';
import { colors, fonts, radii, spacing } from '../../theme';
import type { RootStackParamList } from '../../navigation/types';
import type { TranslationKey } from '../../i18n/translations';

type Props = NativeStackScreenProps<RootStackParamList, 'LegalDoc'>;

const TITLE_KEYS: Record<LegalDocId, TranslationKey> = {
  terms: 'legal.terms',
  cancellation: 'legal.cancellation',
  cookies: 'legal.cookies',
};

/** Renders one lawyer-approved legal document (terms / cancellation / cookies). */
export default function LegalDocScreen({ navigation, route }: Props) {
  const { t, language } = useI18n();
  const insets = useSafeAreaInsets();
  const doc = route.params.doc;
  const sections = legalDocSections(doc, language);

  return (
    <View style={styles.root}>
      <SubpageHeader
        title={t(TITLE_KEYS[doc])}
        onBack={() => navigation.goBack()}
        topInset={insets.top}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.updated}>
          {t('legal.effective', { date: LEGAL_EFFECTIVE_DATE })}
        </Text>

        {sections.map((section) => (
          <View key={section.title} style={styles.card}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            <Text style={styles.cardBody}>{section.body}</Text>
          </View>
        ))}

        <PillButton
          label={t('legal.emailCta')}
          variant="outline"
          onPress={() => void Linking.openURL(`mailto:${LEGAL_CONTACT_EMAIL}`)}
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
  updated: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: colors.textSecondary,
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
});
