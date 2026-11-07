-- ===== MILK MART - SUPABASE SETUP =====
-- Supabase Dashboard -> SQL Editor -> New Query -> Ye poora code paste karo -> RUN
-- 1) PRODUCTS TABLE
create table if not exists products (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null,
  price int not null,
  old_price int,
  size text,
  image text,
  emoji text default '🥛',
  rating text default '⭐⭐⭐⭐⭐',
  in_stock boolean default true,
  created_at timestamptz default now()
);
-- 2) ORDERS TABLE - Checkout se order yahan save hoga
create table if not exists orders (
  id bigint generated always as identity primary key,
  order_id text unique not null,
  customer_name text not null,
  phone text not null,
  address text not null,
  city text,
  payment_method text,
  wallet_number text,
  items jsonb not null,
  subtotal int,
  discount int default 0,
  delivery int default 250,
  total int not null,
  status text default 'pending',
  created_at timestamptz default now()
);
-- 3) Public read/write ON (demo shop ke liye)
alter table products enable row level security;
alter table orders enable row level security;
create policy "Public read products" on products for select using (true);
create policy "Public insert products" on products for insert with check (true);
create policy "Public read orders" on orders for select using (true);
create policy "Public insert orders" on orders for insert with check (true);
-- 4) Sample products insert (pehli baar)
insert into products (name, category, price, old_price, size, image, emoji, rating) values
('Olper''s Full Cream Milk 1.5 Litre','Full Cream Milk',520,550,'1.5 Litre','images/olpers-1.5l.jpg','🥛','⭐⭐⭐⭐⭐ (340)'),
('Olper''s Chocolate Milk 180ml','Flavoured Milk',110,118,'180ml','images/olpers-chocolate-180ml.jpg','🍫','⭐⭐⭐⭐⭐ (510)'),
('Olper''s Dairy Cream 200ml','Dairy Cream',280,304,'200ml','images/olpers-cream-200ml.jpg','🍦','⭐⭐⭐⭐⭐ (480)'),
('Cadbury Dairy Milk Chocolate','Chocolate',320,360,'Bar','images/cadbury-dairy-milk.jpg','🍫','⭐⭐⭐⭐⭐ (620)'),
('Pepsi 1.5 Litre Family','Cold Drinks',240,270,'1.5 Litre','','🥤','⭐⭐⭐⭐⭐ (520)'),
('String Energy Drink 500ml','Cold Drinks',140,160,'500ml','','⚡','⭐⭐⭐⭐⭐ (550)'),
('Nestle Mineral Water 500ml','Pani',70,80,'500ml','','💧','⭐⭐⭐⭐⭐ (500)')
on conflict do nothing;
-- DONE! Ab script.js me apna SUPABASE_URL + SUPABASE_KEY daalo