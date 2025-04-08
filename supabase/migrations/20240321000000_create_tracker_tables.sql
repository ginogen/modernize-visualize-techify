-- Create the clientes table
CREATE TABLE clientes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  color TEXT NOT NULL,
  email TEXT,
  telefono TEXT,
  pais TEXT,
  cuit TEXT,
  condicion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create the tareas table
CREATE TABLE tareas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descripcion TEXT NOT NULL,
  cliente_id UUID REFERENCES clientes(id) ON DELETE SET NULL,
  fecha_estimada TIMESTAMP WITH TIME ZONE,
  completada BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX idx_tareas_cliente_id ON tareas(cliente_id);
CREATE INDEX idx_tareas_fecha_estimada ON tareas(fecha_estimada);
CREATE INDEX idx_tareas_completada ON tareas(completada);

-- Enable Row Level Security (RLS)
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tareas ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON clientes
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON clientes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users" ON clientes
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users" ON clientes
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all users" ON tareas
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON tareas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users" ON tareas
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users" ON tareas
  FOR DELETE USING (auth.role() = 'authenticated'); 