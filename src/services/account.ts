import { supabase } from '../lib/supabase';

/** Erases the signed-in customer via the delete-account Edge Function. */
export async function deleteMyAccount(): Promise<void> {
  const { data, error } = await supabase.functions.invoke('delete-account', {
    body: {},
  });
  if (error) {
    throw new Error(error.message);
  }
  const result = data as { ok?: boolean; error?: string } | null;
  if (result?.error) {
    throw new Error(result.error);
  }
  await supabase.auth.signOut().catch(() => undefined);
}
