/** Same sentinel the delete-account Edge Function writes onto anonymised rows. */
export const DELETED_ACCOUNT_LABEL = 'Deleted account';

export function isDeletedCustomer(name: string | null | undefined): boolean {
  return name === DELETED_ACCOUNT_LABEL;
}
