import React from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { PressableScale } from './PressableScale';
import { useI18n } from '../i18n/LanguageContext';
import { MAX_BOOKING_NOTES, MAX_BOOKING_PHOTOS } from '../services/bookingPhotos';
import { colors, fonts, radii } from '../theme';

/**
 * Optional notes + photos on the booking summary, shown to admin after checkout.
 */
export function BookingNotesFields({
  notes,
  photos,
  onNotes,
  onPhotos,
}: {
  notes: string;
  photos: string[];
  onNotes: (value: string) => void;
  onPhotos: (value: string[]) => void;
}) {
  const { t } = useI18n();
  const remaining = MAX_BOOKING_PHOTOS - photos.length;

  const addUris = (uris: string[]) => {
    if (uris.length === 0) {
      return;
    }
    onPhotos([...photos, ...uris].slice(0, MAX_BOOKING_PHOTOS));
  };

  const pickLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t('summary.photoPermissionTitle'), t('summary.photoPermissionLibrary'));
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: remaining > 1,
      selectionLimit: Math.max(remaining, 1),
      quality: 0.7,
    });
    if (!result.canceled) {
      addUris(result.assets.map((asset) => asset.uri));
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(t('summary.photoPermissionTitle'), t('summary.photoPermissionCamera'));
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (!result.canceled) {
      addUris(result.assets.map((asset) => asset.uri));
    }
  };

  const addPhoto = () => {
    if (remaining <= 0) {
      return;
    }
    Alert.alert(t('summary.photoAdd'), t('summary.photoAddHint'), [
      { text: t('summary.photoLibrary'), onPress: () => void pickLibrary() },
      { text: t('summary.photoCamera'), onPress: () => void takePhoto() },
      { text: t('summary.photoCancel'), style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t('summary.notesTitle')}</Text>
      <Text style={styles.hint}>{t('summary.notesHint')}</Text>
      <TextInput
        value={notes}
        onChangeText={(text) => onNotes(text.slice(0, MAX_BOOKING_NOTES))}
        placeholder={t('summary.notesPlaceholder')}
        placeholderTextColor={colors.textSecondary}
        multiline
        textAlignVertical="top"
        maxLength={MAX_BOOKING_NOTES}
        style={styles.input}
      />
      <View style={styles.photos}>
        {photos.map((uri) => (
          <View key={uri} style={styles.thumbWrap}>
            <Image source={{ uri }} style={styles.thumb} />
            <PressableScale
              onPress={() => onPhotos(photos.filter((item) => item !== uri))}
              style={styles.remove}
              accessibilityLabel={t('summary.photoRemove')}
            >
              <Ionicons name="close" size={14} color="#fff" />
            </PressableScale>
          </View>
        ))}
        {remaining > 0 ? (
          <PressableScale onPress={addPhoto} style={styles.add}>
            <Ionicons name="camera-outline" size={22} color={colors.accentDeep} />
            <Text style={styles.addLabel}>{t('summary.photoAdd')}</Text>
          </PressableScale>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.extraBold,
    color: colors.textPrimary,
  },
  hint: {
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  input: {
    minHeight: 96,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.row,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: fonts.medium,
    color: colors.textPrimary,
  },
  photos: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  thumbWrap: {
    width: 76,
    height: 76,
  },
  thumb: {
    width: 76,
    height: 76,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  remove: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    width: 76,
    height: 76,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  addLabel: {
    fontSize: 11,
    fontFamily: fonts.bold,
    color: colors.accentDeep,
  },
});
