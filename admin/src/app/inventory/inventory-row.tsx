'use client';

import { useEffect, useState, useTransition } from 'react';
import { adjustProductStock, setProductActive, setProductStock } from './actions';

export function InventoryRow({
  productId,
  stock,
  active,
}: {
  productId: string;
  stock: number | null;
  active: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState(stock == null ? '' : String(stock));

  useEffect(() => {
    setDraft(stock == null ? '' : String(stock));
  }, [stock]);

  const run = (fn: () => Promise<{ error?: string }>) => {
    setError(null);
    startTransition(async () => {
      const result = await fn();
      if (result.error) {
        setError(result.error);
      }
    });
  };

  const commitDraft = () => {
    const trimmed = draft.trim();
    if (trimmed === '') {
      if (stock !== null) {
        run(() => setProductStock(productId, null));
      }
      return;
    }
    const parsed = Number(trimmed);
    if (!Number.isInteger(parsed) || parsed < 0) {
      setError('Βάλε ακέραιο αριθμό (0 ή παραπάνω).');
      setDraft(stock == null ? '' : String(stock));
      return;
    }
    if (parsed === stock) {
      return;
    }
    run(() => setProductStock(productId, parsed));
  };

  return (
    <div className="flex min-w-[220px] flex-col items-stretch gap-2 sm:items-end">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => adjustProductStock(productId, -1))}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-lg font-bold text-ink transition hover:bg-zinc-200 active:scale-[0.96] disabled:opacity-50"
          aria-label="Μείωση"
        >
          −
        </button>
        <input
          inputMode="numeric"
          value={draft}
          disabled={pending}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitDraft}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
          placeholder="—"
          className="h-9 w-16 rounded-xl border border-zinc-200 bg-white text-center text-sm font-extrabold text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25 disabled:opacity-50"
          aria-label="Απόθεμα"
        />
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => adjustProductStock(productId, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-lg font-bold text-white transition hover:bg-zinc-800 active:scale-[0.96] disabled:opacity-50"
          aria-label="Αύξηση"
        >
          +
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => adjustProductStock(productId, 10))}
          className="rounded-full bg-accent-soft px-2.5 py-1.5 text-[11px] font-bold text-accent-dark transition hover:brightness-95 active:scale-[0.97] disabled:opacity-50"
        >
          +10
        </button>
      </div>
      <div className="flex flex-wrap justify-end gap-1.5">
        <button
          type="button"
          disabled={pending || stock === 0}
          onClick={() => run(() => setProductStock(productId, 0))}
          className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-bold text-zinc-600 transition hover:bg-zinc-50 active:scale-[0.97] disabled:opacity-40"
        >
          Εξαντλήθηκε
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => setProductActive(productId, !active))}
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition active:scale-[0.97] disabled:opacity-50 ${
            active
              ? 'bg-emerald-50 text-emerald-800'
              : 'bg-zinc-100 text-zinc-500'
          }`}
        >
          {active ? 'Στο κατάστημα' : 'Κρυφό'}
        </button>
      </div>
      {error ? <p className="text-right text-[11px] font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
