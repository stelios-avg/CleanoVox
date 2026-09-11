-- Marketplace inventory: units on hand for each catalog product.
-- Null means stock is not tracked yet (still sellable in the shop).
-- 0 means out of stock.

alter table public.products
  add column if not exists stock integer;

comment on column public.products.stock is
  'Units on hand. Null means stock is not tracked yet (always sellable).';

alter table public.products
  drop constraint if exists products_stock_nonnegative;

alter table public.products
  add constraint products_stock_nonnegative
  check (stock is null or stock >= 0);

create index if not exists products_category_sort_idx
  on public.products (category, sort);

-- Decrement tracked stock when a shop order line is inserted.
create or replace function private.apply_product_order_stock()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  current_stock integer;
begin
  if new.product_id is null then
    return new;
  end if;

  select stock into current_stock
  from public.products
  where id = new.product_id
  for update;

  if current_stock is null then
    return new;
  end if;

  if current_stock < new.quantity then
    raise exception 'Out of stock'
      using errcode = 'P0001';
  end if;

  update public.products
  set stock = stock - new.quantity
  where id = new.product_id;

  return new;
end;
$$;

drop trigger if exists product_order_items_apply_stock on public.product_order_items;
create trigger product_order_items_apply_stock
  after insert on public.product_order_items
  for each row
  execute function private.apply_product_order_stock();

-- Put units back when a live order's line items are deleted.
create or replace function private.restore_product_stock_on_item_delete()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  order_status text;
begin
  if old.product_id is null then
    return old;
  end if;

  select status into order_status
  from public.product_orders
  where id = old.order_id;

  if order_status is null or order_status not in ('cancelled', 'rejected') then
    update public.products
    set stock = stock + old.quantity
    where id = old.product_id
      and stock is not null;
  end if;

  return old;
end;
$$;

drop trigger if exists product_order_items_restore_stock on public.product_order_items;
create trigger product_order_items_restore_stock
  after delete on public.product_order_items
  for each row
  execute function private.restore_product_stock_on_item_delete();

-- Put units back when an order is cancelled or rejected.
create or replace function private.restore_product_stock_on_order_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.status not in ('cancelled', 'rejected')
     and new.status in ('cancelled', 'rejected') then
    update public.products p
    set stock = p.stock + i.quantity
    from public.product_order_items i
    where i.order_id = new.id
      and i.product_id = p.id
      and p.stock is not null;
  end if;
  return new;
end;
$$;

drop trigger if exists product_orders_restore_stock on public.product_orders;
create trigger product_orders_restore_stock
  after update of status on public.product_orders
  for each row
  execute function private.restore_product_stock_on_order_status();
