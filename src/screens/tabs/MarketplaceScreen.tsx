import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Heading, Subtitle } from '../../components/ui';
import { PressableScale } from '../../components/PressableScale';
import { SHOP_CATEGORIES } from '../../constants/shop';
import { formatEuros } from '../../constants/payments';
import { useCart } from '../../context/CartContext';
import { useI18n } from '../../i18n/LanguageContext';
import { colors, fonts, radii, spacing } from '../../theme';
import type { RootStackParamList } from '../../navigation/types';

export default function MarketplaceScreen() {
  const { t } = useI18n();
  const { count, totalCents } = useCart();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.root}>
      <ScrollView style={styles.root} contentContainerStyle={styles.content}>
        <Heading>{t('shop.title')}</Heading>
        <Subtitle>{t('shop.subtitle')}</Subtitle>

        <View style={styles.grid}>
          {SHOP_CATEGORIES.map((cat) => (
            <PressableScale
              key={cat.slug}
              onPress={() => navigation.navigate('ShopCategory', { category: cat.slug })}
              style={styles.card}
            >
              <Image
                source={cat.photo}
                style={styles.photo}
                resizeMode={cat.photoFit}
              />
              <LinearGradient
                colors={['transparent', 'rgba(8,16,16,0.15)', 'rgba(8,16,16,0.88)']}
                locations={[0.35, 0.62, 1]}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.cardLabel} numberOfLines={2}>
                {t(`shopCat.${cat.slug}`)}
              </Text>
            </PressableScale>
          ))}
        </View>
      </ScrollView>

      {count > 0 ? (
        <PressableScale
          onPress={() => navigation.navigate('ShopCart')}
          style={styles.cartBar}
        >
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{count}</Text>
          </View>
          <Text style={styles.cartBarLabel}>{t('shop.viewCart')}</Text>
          <Text style={styles.cartBarTotal}>{formatEuros(totalCents)}</Text>
        </PressableScale>
      ) : null}
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
    gap: 8,
    paddingBottom: 100,
  },
  grid: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  card: {
    width: '48.2%',
    height: 176,
    borderRadius: radii.card,
    backgroundColor: '#ECEFEF',
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  photo: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  cardLabel: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: colors.textOnDark,
    lineHeight: 18,
    paddingHorizontal: 12,
    paddingBottom: 14,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  cartBar: {
    position: 'absolute',
    left: spacing.screen,
    right: spacing.screen,
    bottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.accent,
    borderRadius: radii.pill,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  cartBadge: {
    minWidth: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(26,22,8,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  cartBadgeText: {
    color: colors.textOnAccent,
    fontSize: 13,
    fontFamily: fonts.extraBold,
  },
  cartBarLabel: {
    flex: 1,
    color: colors.textOnAccent,
    fontSize: 15,
    fontFamily: fonts.bold,
  },
  cartBarTotal: {
    color: colors.textOnAccent,
    fontSize: 16,
    fontFamily: fonts.extraBold,
  },
});
