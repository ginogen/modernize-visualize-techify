-- Agregar columna moneda a la tabla mensualidades
ALTER TABLE public.mensualidades
ADD COLUMN IF NOT EXISTS moneda text check (moneda in ('ARS', 'USD')) default 'ARS';

-- Actualizar registros existentes para que tengan un valor por defecto
UPDATE public.mensualidades
SET moneda = 'ARS'
WHERE moneda IS NULL; 