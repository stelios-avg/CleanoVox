import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PillButton, SubpageHeader } from '../../components/ui';
import { useI18n } from '../../i18n/LanguageContext';
import { deleteMyAccount } from '../../services/account';
import { colors, fonts, radii, spacing } from '../../theme';
import type { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DeleteAccount'>;

export default function DeleteAccountScreen({ navigation }: Props) {
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState(false);

  const confirm = () => {
    Alert.alert(t('deleteAccount.confirmTitle'), t('deleteAccount.confirmBody'), [
      { text: t('deleteAccount.keep'), style: 'cancel' },
      {
        text: t('deleteAccount.confirmYes'),
        style: 'destructive',
        onPress: () => void runDelete(),
      },
    ]);
  };

  const runDelete = async () => {
    setBusy(true);
    try {
      await deleteMyAccount();
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    } catch (e) {
      Alert.alert(t('auth.errorTitle'), (e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.root}>
      <SubpageHeader
        title={t('deleteAccount.title')}
        onBack={() => navigation.goBack()}
        topInset={insets.top}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.body}>{t('deleteAccount.body')}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.bullet}>{t('deleteAccount.bullet1')}</Text>
          <Text style={styles.bullet}>{t('deleteAccount.bullet2')}</Text>
          <Text style={styles.bullet}>{t('deleteAccount.bullet3')}</Text>
        </View>
        <PillButton
          label={busy ? t('auth.pleaseWait') : t('deleteAccount.cta')}
          onPress={confirm}
          disabled={busy}
        />
        <PillButton
          label={t('deleteAccount.keep')}
          variant="outline"
          onPress={() => navigation.goBack()}
          disabled={busy}
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
    gap: 12,
  },
  card: {
    borderRadius: radii.card,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 8,
  },
  body: {
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  bullet: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    lineHeight: 21,
  },
});
