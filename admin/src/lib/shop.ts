export const LOW_STOCK_MAX = 5;

export const CATEGORY_LABEL: Record<string, string> = {
  detergents: 'Καθαριστικά',
  paper: 'Χαρτικά',
  bags: 'Σακούλες',
  tools: 'Εργαλεία',
  professional: 'Επαγγελματικά',
  bins: 'Κάδοι',
  equipment: 'Εξοπλισμός',
  dispensers: 'Συσκευές',
  household: 'Οικιακά',
  'personal-care': 'Προσωπική φροντίδα',
  beverages: 'Ροφήματα',
};

export const CATEGORY_ORDER = [
  'detergents',
  'paper',
  'bags',
  'tools',
  'professional',
  'bins',
  'equipment',
  'dispensers',
  'household',
  'personal-care',
  'beverages',
] as const;

export function categoryLabel(slug: string) {
  return CATEGORY_LABEL[slug] ?? slug;
}

export function euros(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}
