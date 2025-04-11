import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus, Pencil, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

interface Cliente {
  id: string;
  nombre: string;
}

interface Pago {
  id: string;
  cliente_id: string;
  cliente_nombre: string;
  descripcion: string;
  monto: number;
  fecha_pago: string;
  estado: string;
}

export function PagosTable() {
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth());
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pagoEditando, setPagoEditando] = useState<Pago | null>(null);
  const [nuevoPago, setNuevoPago] = useState({
    cliente_id: '',
    descripcion: '',
    monto: '',
    fecha_pago: format(new Date(), 'yyyy-MM-dd'),
    estado: 'Pendiente'
  });

  useEffect(() => {
    cargarClientes();
    cargarPagos();
  }, [mesSeleccionado]);

  const cargarClientes = async () => {
    const { data, error } = await supabase
      .from('clientes')
      .select('id, nombre')
      .order('nombre');
    
    if (!error && data) {
      setClientes(data);
    }
  };

  const cargarPagos = async () => {
    const { data, error } = await supabase
      .from('pagos')
      .select(`
        *,
        clientes:cliente_id(nombre)
      `)
      .order('fecha_pago', { ascending: false });
    
    if (!error && data) {
      const pagosFormateados = data.map(pago => ({
        ...pago,
        cliente_nombre: pago.clientes?.nombre || ''
      }));
      setPagos(pagosFormateados);
    }
  };

  const handleGuardarPago = async () => {
    if (pagoEditando) {
      const { error } = await supabase
        .from('pagos')
        .update({
          cliente_id: nuevoPago.cliente_id,
          descripcion: nuevoPago.descripcion,
          monto: parseFloat(nuevoPago.monto),
          fecha_pago: nuevoPago.fecha_pago,
          estado: nuevoPago.estado
        })
        .eq('id', pagoEditando.id);
      
      if (!error) {
        cargarPagos();
        setIsDialogOpen(false);
        setPagoEditando(null);
      }
    } else {
      const { error } = await supabase
        .from('pagos')
        .insert([{
          cliente_id: nuevoPago.cliente_id,
          descripcion: nuevoPago.descripcion,
          monto: parseFloat(nuevoPago.monto),
          fecha_pago: nuevoPago.fecha_pago,
          estado: nuevoPago.estado
        }]);
      
      if (!error) {
        cargarPagos();
        setIsDialogOpen(false);
      }
    }
  };

  const handleEliminarPago = async (id: string) => {
    const { error } = await supabase
      .from('pagos')
      .delete()
      .eq('id', id);
    
    if (!error) {
      cargarPagos();
    }
  };

  const handleEditarPago = (pago: Pago) => {
    setPagoEditando(pago);
    setNuevoPago({
      cliente_id: pago.cliente_id,
      descripcion: pago.descripcion,
      monto: pago.monto.toString(),
      fecha_pago: pago.fecha_pago,
      estado: pago.estado
    });
    setIsDialogOpen(true);
  };

  const pagosPagados = pagos.filter(pago => pago.estado === 'Pagado');
  const pagosPendientes = pagos.filter(pago => pago.estado === 'Pendiente');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Select
          value={mesSeleccionado.toString()}
          onValueChange={(value) => setMesSeleccionado(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar mes" />
          </SelectTrigger>
          <SelectContent>
            {meses.map((mes, index) => (
              <SelectItem key={index} value={index.toString()}>
                {mes}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Pago
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {pagoEditando ? 'Editar Pago' : 'Nuevo Pago'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Cliente</Label>
                <Select
                  value={nuevoPago.cliente_id}
                  onValueChange={(value) => setNuevoPago({...nuevoPago, cliente_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map((cliente) => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Descripción</Label>
                <Input
                  value={nuevoPago.descripcion}
                  onChange={(e) => setNuevoPago({...nuevoPago, descripcion: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label>Monto</Label>
                <Input
                  type="number"
                  value={nuevoPago.monto}
                  onChange={(e) => setNuevoPago({...nuevoPago, monto: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label>Fecha</Label>
                <Input
                  type="date"
                  value={nuevoPago.fecha_pago}
                  onChange={(e) => setNuevoPago({...nuevoPago, fecha_pago: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label>Estado</Label>
                <Select
                  value={nuevoPago.estado}
                  onValueChange={(value) => setNuevoPago({...nuevoPago, estado: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Pagado">Pagado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleGuardarPago}>
                Guardar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="pendientes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
          <TabsTrigger value="pagados">Pagados</TabsTrigger>
        </TabsList>

        <TabsContent value="pendientes">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagosPendientes.map((pago) => (
                <TableRow key={pago.id}>
                  <TableCell>{pago.cliente_nombre}</TableCell>
                  <TableCell>{pago.descripcion}</TableCell>
                  <TableCell>{format(new Date(pago.fecha_pago), 'dd/MM/yyyy', { locale: es })}</TableCell>
                  <TableCell>${pago.monto}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[120px]">
                          {pago.estado} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEditarPago({...pago, estado: 'Pagado'})}>
                          Pagado
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditarPago({...pago, estado: 'Pendiente'})}>
                          Pendiente
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditarPago(pago)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEliminarPago(pago.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="pagados">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagosPagados.map((pago) => (
                <TableRow key={pago.id}>
                  <TableCell>{pago.cliente_nombre}</TableCell>
                  <TableCell>{pago.descripcion}</TableCell>
                  <TableCell>{format(new Date(pago.fecha_pago), 'dd/MM/yyyy', { locale: es })}</TableCell>
                  <TableCell>${pago.monto}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[120px]">
                          {pago.estado} <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEditarPago({...pago, estado: 'Pagado'})}>
                          Pagado
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditarPago({...pago, estado: 'Pendiente'})}>
                          Pendiente
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditarPago(pago)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEliminarPago(pago.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
} 