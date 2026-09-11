import Link from 'next/link';
import { AdminHeader } from '@/components/admin-header';
import { requireAdmin } from '@/lib/auth';
import { CATEGORY_ORDER, LOW_STOCK_MAX, categoryLabel, euros } from '@/lib/shop';
import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/lib/types';
import { InventoryRow } from './inventory-row';

type StockFilter = 'all' | 'out' | 'low' | 'untracked' | 'inactive';

function isStockFilter(value: string): value is StockFilter {
  return ['all', 'out', 'low', 'untracked', 'inactive'].includes(value);
}

function matchesQuery(product: Product, q: string) {
  return (
    product.name_el.toLowerCase().includes(q) ||
    product.name_en.toLowerCase().includes(q) ||
    product.code.toLowerCase().includes(q) ||
    (product.variant_label ?? '').toLowerCase().includes(q)
  );
}

function stockTone(stock: number | null) {
  if (stock === null) return 'untracked';
  if (stock === 0) return 'out';
  if (stock <= LOW_STOCK_MAX) return 'low';
  return 'ok';
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; stock?: string; q?: string }>;
}) {
  const profile = await requireAdmin();
  const params = await searchParams;
  const q = (params.q ?? '').trim().toLowerCase();
  const stockFilter = isStockFilter(params.stock ?? '') ? (params.stock as StockFilter) : 'all';

  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('category')
    .order('sort');

  const all = products ?? [];
  const categoryParam =
    all.some((p) => p.category === params.category) ? params.category! : '';

  const categories = Array.from(new Set(all.map((p) => p.category))).sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a as (typeof CATEGORY_ORDER)[number]);
    const ib = CATEGORY_ORDER.indexOf(b as (typeof CATEGORY_ORDER)[number]);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });

  const outCount = all.filter((p) => p.stock === 0).length;
  const lowCount = all.filter(
    (p) => p.stock != null && p.stock > 0 && p.stock <= LOW_STOCK_MAX
  ).length;
  const untrackedCount = all.filter((p) => p.stock == null).length;
  const inactiveCount = all.filter((p) => !p.active).length;

  const filtered = all.filter((p) => {
    if (categoryParam && p.category !== categoryParam) return false;
    if (stockFilter === 'out' && p.stock !== 0) return false;
    if (stockFilter === 'low' && !(p.stock != null && p.stock > 0 && p.stock <= LOW_STOCK_MAX)) {
      return false;
    }
    if (stockFilter === 'untracked' && p.stock != null) return false;
    if (stockFilter === 'inactive' && p.active) return false;
    if (!q) return true;
    return matchesQuery(p, q);
  });

  const searchWith = (next: { category?: string; stock?: string; q?: string }) => {
    const sp = new URLSearchParams();
    const category = next.category ?? categoryParam;
    const stock = next.stock ?? (stockFilter === 'all' ? '' : stockFilter);
    const query = next.q ?? params.q ?? '';
    if (category) sp.set('category', category);
    if (stock && stock !== 'all') sp.set('stock', stock);
    if (query) sp.set('q', query);
    const qs = sp.toString();
    return qs ? `/inventory?${qs}` : '/inventory';
  };

  const stockFilters: Array<{ key: StockFilter; label: string; count: number }> = [
    { key: 'all', label: 'Όλα', count: all.length },
    { key: 'out', label: 'Εξαντλημένα', count: outCount },
    { key: 'low', label: `Χαμηλά (≤${LOW_STOCK_MAX})`, count: lowCount },
    { key: 'untracked', label: 'Χωρίς μέτρηση', count: untrackedCount },
    { key: 'inactive', label: 'Κρυφά', count: inactiveCount },
  ];

  return (
    <main className="min-h-full bg-[radial-gradient(ellipse_at_top,_#d4f4f4_0%,_#f7fcfc_42%,_#f7fcfc_100%)]">
      <AdminHeader title="Απόθεμα" email={profile.email} />

      <div className="animate-fade-up mx-auto max-w-6xl px-6 py-7">
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <Link
            href={searchWith({ stock: 'all' })}
            className="rounded-[22px] bg-white p-5 shadow-[0_10px_30px_rgba(16,22,22,0.05)] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(16,22,22,0.08)]"
          >
            <p className="text-xs font-bold tracking-wide text-zinc-500">SKU</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-ink">{all.length}</p>
          </Link>
          <Link
            href={searchWith({ stock: 'out' })}
            className="rounded-[22px] bg-gradient-to-br from-[#5EE0E0] to-[#1A8F8F] p-5 text-[#072424] shadow-[0_12px_30px_rgba(48,204,204,0.32)] transition hover:-translate-y-0.5 hover:brightness-105"
          >
            <p className="text-xs font-bold tracking-wide text-[#072424]/70">ΕΞΑΝΤΛΗΜΕΝΑ</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight">{outCount}</p>
          </Link>
          <Link
            href={searchWith({ stock: 'low' })}
            className="rounded-[22px] bg-white p-5 shadow-[0_10px_30px_rgba(16,22,22,0.05)] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(16,22,22,0.08)]"
          >
            <p className="text-xs font-bold tracking-wide text-zinc-500">ΧΑΜΗΛΟ ΑΠΟΘΕΜΑ</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-ink">{lowCount}</p>
          </Link>
        </div>

        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          Κενό πεδίο (—) σημαίνει ότι δεν μετράς ακόμα το προϊόν — μένει διαθέσιμο στο
          κατάστημα. Βάλε αριθμό για να ξεκινήσεις καταμέτρηση, ή 0 για εξαντλημένο.
        </p>

        <form method="get" className="mb-4">
          {categoryParam ? <input type="hidden" name="category" value={categoryParam} /> : null}
          {stockFilter !== 'all' ? <input type="hidden" name="stock" value={stockFilter} /> : null}
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <input
              name="q"
              defaultValue={params.q ?? ''}
              placeholder="Αναζήτηση ονόματος, κωδικού, συσκευασίας…"
              className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/20"
            />
          </div>
        </form>

        <div className="mb-3 flex flex-wrap gap-2">
          {stockFilters.map((f) => {
            const active = f.key === stockFilter;
            return (
              <Link
                key={f.key}
                href={searchWith({ stock: f.key })}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold transition active:scale-[0.98] ${
                  active
                    ? 'bg-ink text-white shadow-[0_8px_18px_rgba(14,20,20,0.22)]'
                    : 'bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-accent-soft'
                }`}
              >
                {f.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    active ? 'bg-white/15 text-white' : 'bg-zinc-100 text-zinc-600'
                  }`}
                >
                  {f.count}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          <Link
            href={searchWith({ category: '' })}
            className={`inline-flex items-center rounded-full px-3.5 py-2 text-xs font-bold transition active:scale-[0.98] ${
              !categoryParam
                ? 'bg-ink text-white'
                : 'bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-accent-soft'
            }`}
          >
            Όλες οι κατηγορίες
          </Link>
          {categories.map((slug) => {
            const active = slug === categoryParam;
            return (
              <Link
                key={slug}
                href={searchWith({ category: slug })}
                className={`inline-flex items-center rounded-full px-3.5 py-2 text-xs font-bold transition active:scale-[0.98] ${
                  active
                    ? 'bg-ink text-white'
                    : 'bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-accent-soft'
                }`}
              >
                {categoryLabel(slug)}
              </Link>
            );
          })}
        </div>

        {error ? (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error.message}
          </p>
        ) : filtered.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-zinc-300 bg-white/80 px-6 py-20 text-center backdrop-blur">
            <p className="text-lg font-extrabold text-ink">Δεν βρέθηκαν προϊόντα</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500">
              Δοκίμασε άλλο φίλτρο ή καθάρισε την αναζήτηση.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2.5">
            {filtered.map((p) => {
              const tone = stockTone(p.stock);
              return (
                <li
                  key={p.id}
                  className="rounded-[22px] bg-white p-4 shadow-[0_8px_24px_rgba(16,22,22,0.04)] ring-1 ring-black/5 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-bold text-accent-dark">
                          {categoryLabel(p.category)}
                        </span>
                        <span className="text-[11px] font-semibold tracking-wide text-zinc-400">
                          {p.code}
                        </span>
                        {tone === 'out' ? (
                          <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700">
                            Εξαντλήθηκε
                          </span>
                        ) : null}
                        {tone === 'low' ? (
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                            Χαμηλό
                          </span>
                        ) : null}
                        {tone === 'untracked' ? (
                          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-500">
                            Χωρίς μέτρηση
                          </span>
                        ) : null}
                        {!p.active ? (
                          <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-[11px] font-bold text-white">
                            Κρυφό
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-base font-extrabold tracking-tight text-ink">
                        {p.name_el}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
                        {p.variant_label ? (
                          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600">
                            {p.variant_label}
                          </span>
                        ) : null}
                        <span className="font-extrabold text-ink">{euros(p.price_cents)}</span>
                      </div>
                    </div>
                    <InventoryRow
                      key={`${p.id}-${p.stock ?? 'n'}-${p.active ? 'a' : 'h'}`}
                      productId={p.id}
                      stock={p.stock}
                      active={p.active}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
