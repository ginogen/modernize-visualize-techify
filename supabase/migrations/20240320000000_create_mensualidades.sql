create table if not exists public.mensualidades (
  id uuid default gen_random_uuid() primary key,
  cliente_id uuid references public.clientes(id) on delete cascade,
  suscripcion_activa boolean default false,
  plataforma text check (plataforma in ('Stripe', 'MercadoPago', 'Transferencia')),
  moneda text check (moneda in ('ARS', 'USD')) default 'ARS',
  pagos jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade
);

-- Habilitar RLS
alter table public.mensualidades enable row level security;

-- Crear políticas de seguridad
create policy "Los usuarios pueden ver sus propias mensualidades"
  on public.mensualidades for select
  using (auth.uid() = user_id);

create policy "Los usuarios pueden insertar sus propias mensualidades"
  on public.mensualidades for insert
  with check (auth.uid() = user_id);

create policy "Los usuarios pueden actualizar sus propias mensualidades"
  on public.mensualidades for update
  using (auth.uid() = user_id);

create policy "Los usuarios pueden eliminar sus propias mensualidades"
  on public.mensualidades for delete
  using (auth.uid() = user_id);

-- Crear trigger para actualizar updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger handle_mensualidades_updated_at
  before update on public.mensualidades
  for each row
  execute function public.handle_updated_at(); 