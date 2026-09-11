import catalog from '../data/products.json';
import { HIDDEN_SHOP_CATEGORIES } from '../constants/shop';
import { SERVICE_FEE_CENTS } from '../constants/payments';
import { supabase } from '../lib/supabase';
import type { ContactDetails } from '../navigation/types';
import type { Product, ProductOrder, ProductOrderItem } from '../types/database';

type CatalogRow = Omit<Product, 'created_at' | 'stock'> & {
  image?: string;
  stock?: number | null;
};

/** Instant local catalog — browsing never waits on the network. */
function localProducts(category: string): Product[] {
  if ((HIDDEN_SHOP_CATEGORIES as readonly string[]).includes(category)) {
    return [];
  }
  return (catalog as CatalogRow[])
    .filter((p) => p.category === category && p.active)
    .sort((a, b) => a.sort - b.sort)
    .map(({ image: _image, ...p }) => ({ ...p, created_at: '', stock: p.stock ?? null }));
}

export function catalogProducts(category: string): Product[] {
  return localProducts(category);
}

/** Null stock is untracked (unlimited). 0 is sold out. */
export function maxPurchasable(product: Product): number {
  if (product.stock == null) {
    return Number.POSITIVE_INFINITY;
  }
  return Math.max(0, product.stock);
}

export function isOutOfStock(product: Product): boolean {
  return product.stock === 0;
}

export async function listProductsByCategory(category: string): Promise<Product[]> {
  const local = localProducts(category);
  const ids = local.map((p) => p.id);
  if (ids.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('id, stock, active')
    .in('id', ids);

  if (error || !data) {
    return local;
  }

  const byId = new Map(data.map((row) => [row.id, row]));
  return local.flatMap((product) => {
    const row = byId.get(product.id);
    if (!row || !row.active) {
      return [];
    }
    return [{ ...product, stock: row.stock, active: row.active }];
  });
}

export type OrderItemInput = {
  productId: string;
  nameEl: string;
  nameEn: string;
  variantLabel: string | null;
  unitPriceCents: number;
  quantity: number;
};

/** Creates the order plus its line items for the signed-in user. */
export async function createProductOrder(
  items: OrderItemInput[],
  contact: Pick<ContactDetails, 'email' | 'phone' | 'address'>
): Promise<ProductOrder> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error(userError?.message ?? 'Not signed in');
  }

  const subtotal = items.reduce((sum, i) => sum + i.unitPriceCents * i.quantity, 0);
  const total = subtotal + SERVICE_FEE_CENTS;

  const { data: order, error: orderError } = await supabase
    .from('product_orders')
    .insert({
      user_id: user.id,
      contact_email: contact.email.trim(),
      contact_phone: contact.phone.trim(),
      contact_address: contact.address.trim(),
      total_cents: total,
    })
    .select()
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  const { error: itemsError } = await supabase.from('product_order_items').insert([
    ...items.map((i) => ({
      order_id: order.id,
      product_id: i.productId,
      name_el: i.nameEl,
      name_en: i.nameEn,
      variant_label: i.variantLabel,
      unit_price_cents: i.unitPriceCents,
      quantity: i.quantity,
    })),
    {
      order_id: order.id,
      product_id: null,
      name_el: 'Service fee',
      name_en: 'Service fee',
      variant_label: null,
      unit_price_cents: SERVICE_FEE_CENTS,
      quantity: 1,
    },
  ]);

  if (itemsError) {
    // Don't leave a header row without items behind.
    await supabase.from('product_orders').delete().eq('id', order.id);
    throw new Error(itemsError.message);
  }

  return order;
}

export type MyOrder = ProductOrder & { product_order_items: ProductOrderItem[] };

export async function listMyOrders(): Promise<MyOrder[]> {
  const { data, error } = await supabase
    .from('product_orders')
    .select('*, product_order_items(*)')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as unknown as MyOrder[] | null) ?? [];
}
