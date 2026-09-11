'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_STOCK = 999_999;

function isUuid(id: string) {
  return UUID_RE.test(id);
}

function parseStock(value: number | null) {
  if (value === null) {
    return null;
  }
  if (!Number.isInteger(value) || value < 0 || value > MAX_STOCK) {
    return undefined;
  }
  return value;
}

export async function setProductStock(productId: string, stock: number | null) {
  await requireAdmin();
  if (!isUuid(productId)) {
    return { error: 'Μη έγκυρο προϊόν.' };
  }
  const next = parseStock(stock);
  if (next === undefined) {
    return { error: 'Μη έγκυρη ποσότητα.' };
  }
  const supabase = await createClient();
  const { error } = await supabase.from('products').update({ stock: next }).eq('id', productId);
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/inventory');
  return { ok: true as const };
}

export async function adjustProductStock(productId: string, delta: number) {
  await requireAdmin();
  if (!isUuid(productId) || !Number.isInteger(delta) || delta === 0) {
    return { error: 'Μη έγκυρη προσαρμογή.' };
  }
  const supabase = await createClient();
  const { data, error: readError } = await supabase
    .from('products')
    .select('stock')
    .eq('id', productId)
    .maybeSingle();
  if (readError) {
    return { error: readError.message };
  }
  if (!data) {
    return { error: 'Το προϊόν δεν βρέθηκε.' };
  }
  const current = data.stock;
  if (current == null && delta <= 0) {
    return { ok: true as const, stock: null };
  }
  const next =
    current == null ? delta : Math.max(0, Math.min(MAX_STOCK, current + delta));
  const { error } = await supabase.from('products').update({ stock: next }).eq('id', productId);
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/inventory');
  return { ok: true as const, stock: next };
}

export async function setProductActive(productId: string, active: boolean) {
  await requireAdmin();
  if (!isUuid(productId)) {
    return { error: 'Μη έγκυρο προϊόν.' };
  }
  const supabase = await createClient();
  const { error } = await supabase.from('products').update({ active }).eq('id', productId);
  if (error) {
    return { error: error.message };
  }
  revalidatePath('/inventory');
  return { ok: true as const };
}
