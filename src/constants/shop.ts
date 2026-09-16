import type { ImageSourcePropType } from 'react-native';
import type { Ionicons } from '@expo/vector-icons';

export type ShopCategorySlug =
  | 'detergents'
  | 'bags'
  | 'paper'
  | 'tools'
  | 'professional'
  | 'bins'
  | 'equipment'
  | 'personal-care'
  | 'dispensers'
  | 'household';

/** Hidden from the shop (food/drinks and personal care). */
export const HIDDEN_SHOP_CATEGORIES = ['beverages', 'personal-care'] as const;

export type ShopCategory = {
  slug: ShopCategorySlug;
  /** i18n key suffix — full key is `shopCat.${slug}` */
  icon: keyof typeof Ionicons.glyphMap;
  photo: ImageSourcePropType;
  photoFit: 'cover' | 'contain';
};

/** Display order of the marketplace categories. */
export const SHOP_CATEGORIES: ShopCategory[] = [
  {
    slug: 'detergents',
    icon: 'flask-outline',
    photo: require('../../assets/images/shop/detergents.jpg'),
    photoFit: 'contain',
  },
  {
    slug: 'paper',
    icon: 'file-tray-stacked-outline',
    photo: require('../../assets/images/shop/paper.jpg'),
    photoFit: 'contain',
  },
  {
    slug: 'bags',
    icon: 'trash-bin-outline',
    photo: require('../../assets/images/shop/bags.jpg'),
    photoFit: 'contain',
  },
  {
    slug: 'tools',
    icon: 'brush-outline',
    photo: require('../../assets/images/shop/tools.jpg'),
    photoFit: 'contain',
  },
  {
    slug: 'professional',
    icon: 'shield-checkmark-outline',
    photo: require('../../assets/images/shop/professional.jpg'),
    photoFit: 'cover',
  },
  {
    slug: 'bins',
    icon: 'trash-outline',
    photo: require('../../assets/images/shop/bins.jpg'),
    photoFit: 'cover',
  },
  {
    slug: 'equipment',
    icon: 'cart-outline',
    photo: require('../../assets/images/shop/equipment.png'),
    photoFit: 'cover',
  },
  {
    slug: 'dispensers',
    icon: 'water-outline',
    photo: require('../../assets/images/shop/dispensers.jpg'),
    photoFit: 'cover',
  },
  {
    slug: 'household',
    icon: 'home-outline',
    photo: require('../../assets/images/shop/household.png'),
    photoFit: 'cover',
  },
];
