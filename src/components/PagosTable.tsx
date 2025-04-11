import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Plus, Pencil, Trash2, DollarSign, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { format, parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Database } from "@/types/supabase";

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

type Tables = Database['public']['Tables']
type Cliente = Tables['clientes']['Row']
type Pago = Tables['pagos']['Row'] & {
  clientes: Tables['clientes']['Row'] | null
}

type EditingPago = {
  cliente_id: string;
  descripcion: string;
  monto: string;
  fecha_pago: string;
  estado: string;
  moneda: string;
  isNew?: boolean;
};

export function PagosTable() {
  const [mesSeleccionado, setMesSeleccionado] = useState(new Date().getMonth());
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [editingPago, setEditingPago] = useState<EditingPago | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    cargarClientes();
    cargarPagos();
  }, [mesSeleccionado]);

  const cargarClientes = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user.id) return;

    const { data, error } = await supabase
      .from('clientes')
      .select()
      .eq('user_id', session.session.user.id)
      .order('nombre');

    if (!error && data) {
      setClientes(data);
    }
  };

  const cargarPagos = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user.id) return;

    const { data, error } = await supabase
      .from('pagos')
      .select('*, clientes(*)')
      .eq('user_id', session.session.user.id)
      .order('fecha_pago', { ascending: false });

    if (!error && data) {
      setPagos(data as Pago[]);
    }
  };

  const handleStartEdit = (pago?: Pago) => {
    if (pago) {
      setEditingId(pago.id);
      setEditingPago({
        cliente_id: pago.cliente_id,
        descripcion: pago.descripcion,
        monto: pago.monto.toString(),
        fecha_pago: pago.fecha_pago,
        estado: pago.estado,
        moneda: pago.moneda
      });
    } else {
      setEditingId("new");
      setEditingPago({
        cliente_id: "",
        descripcion: "",
        monto: "",
        fecha_pago: format(new Date(), "yyyy-MM-dd"),
        estado: "Pendiente",
        moneda: "ARS",
        isNew: true
      });
    }
  };

  const handleSave = async () => {
    if (!editingPago) return;

    const { data: session } = await supabase.auth.getSession();
    if (!session.session?.user.id) return;

    const pagoData = {
      cliente_id: editingPago.cliente_id,
      descripcion: editingPago.descripcion,
      monto: parseFloat(editingPago.monto),
      fecha_pago: editingPago.fecha_pago,
      estado: editingPago.estado,
      moneda: editingPago.moneda,
      user_id: session.session.user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (editingPago.isNew) {
      const { error } = await supabase
        .from('pagos')
        .insert(pagoData);

      if (!error) {
        setEditingPago(null);
        setEditingId(null);
        cargarPagos();
      }
    } else if (editingId) {
      const { error } = await supabase
        .from('pagos')
        .update({
          ...pagoData,
          created_at: undefined
        })
        .eq('id', editingId);

      if (!error) {
        setEditingPago(null);
        setEditingId(null);
        cargarPagos();
      }
    }
  };

  const handleCancel = () => {
    setEditingPago(null);
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
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

  const handleCambiarEstado = async (pago: Pago, nuevoEstado: string) => {
    const { error } = await supabase
      .from('pagos')
      .update({ estado: nuevoEstado })
      .eq('id', pago.id);

    if (!error) {
      cargarPagos();
    }
  };

  const pagosPagados = pagos.filter(pago => pago.estado === "Pagado");
  const pagosPendientes = pagos.filter(pago => pago.estado === "Pendiente");

  // Calcular totales del mes seleccionado
  const fechaInicio = startOfMonth(new Date(new Date().getFullYear(), mesSeleccionado));
  const fechaFin = endOfMonth(new Date(new Date().getFullYear(), mesSeleccionado));

  const pagosMes = pagos.filter(pago => {
    const fechaPago = parseISO(pago.fecha_pago);
    return fechaPago >= fechaInicio && fechaPago <= fechaFin;
  });

  const totalIngresos = pagosMes
    .filter(pago => pago.estado === "Pagado")
    .reduce((sum, pago) => sum + pago.monto, 0);

  const totalPendiente = pagosMes
    .filter(pago => pago.estado === "Pendiente")
    .reduce((sum, pago) => sum + pago.monto, 0);

  // Calcular totales por moneda
  const totalIngresosARS = pagosMes
    .filter(pago => pago.estado === "Pagado" && pago.moneda === "ARS")
    .reduce((sum, pago) => sum + pago.monto, 0);

  const totalPendienteARS = pagosMes
    .filter(pago => pago.estado === "Pendiente" && pago.moneda === "ARS")
    .reduce((sum, pago) => sum + pago.monto, 0);

  const totalIngresosUSD = pagosMes
    .filter(pago => pago.estado === "Pagado" && pago.moneda === "USD")
    .reduce((sum, pago) => sum + pago.monto, 0);

  const totalPendienteUSD = pagosMes
    .filter(pago => pago.estado === "Pendiente" && pago.moneda === "USD")
    .reduce((sum, pago) => sum + pago.monto, 0);

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
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ingresos ARS
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalIngresosARS.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {meses[mesSeleccionado]} {new Date().getFullYear()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pendiente ARS
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPendienteARS.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {meses[mesSeleccionado]} {new Date().getFullYear()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ingresos USD
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">U$D {totalIngresosUSD.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {meses[mesSeleccionado]} {new Date().getFullYear()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pendiente USD
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">U$D {totalPendienteUSD.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {meses[mesSeleccionado]} {new Date().getFullYear()}
            </p>
          </CardContent>
        </Card>
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
                <TableHead>Moneda</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!editingId && (
                <TableRow
                  className="hover:bg-muted/50 cursor-pointer text-muted-foreground"
                  onClick={() => handleStartEdit()}
                >
                  <TableCell colSpan={7}>
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Agregar nuevo pago...
                    </span>
                  </TableCell>
                </TableRow>
              )}
              {editingId === "new" && (
                <TableRow className="bg-muted">
                  <TableCell>
                    <Select
                      value={editingPago?.cliente_id}
                      onValueChange={(value) =>
                        setEditingPago({ ...editingPago!, cliente_id: value })
                      }
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
                  </TableCell>
                  <TableCell>
                    <Input
                      value={editingPago?.descripcion}
                      onChange={(e) =>
                        setEditingPago({
                          ...editingPago!,
                          descripcion: e.target.value,
                        })
                      }
                      onKeyDown={handleKeyDown}
                      autoFocus
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="date"
                      value={editingPago?.fecha_pago}
                      onChange={(e) =>
                        setEditingPago({
                          ...editingPago!,
                          fecha_pago: e.target.value,
                        })
                      }
                      onKeyDown={handleKeyDown}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={editingPago?.monto}
                      onChange={(e) =>
                        setEditingPago({
                          ...editingPago!,
                          monto: e.target.value,
                        })
                      }
                      onKeyDown={handleKeyDown}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={editingPago?.moneda}
                      onValueChange={(value) =>
                        setEditingPago({ ...editingPago!, moneda: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ARS">ARS ($)</SelectItem>
                        <SelectItem value="USD">USD (U$D)</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={editingPago?.estado}
                      onValueChange={(value) =>
                        setEditingPago({ ...editingPago!, estado: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Pagado">Pagado</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSave}>
                        Guardar
                      </Button>
                      <Button size="sm" variant="ghost" onClick={handleCancel}>
                        Cancelar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {pagosPendientes.map((pago) => (
                <TableRow
                  key={pago.id}
                  className={
                    editingId === pago.id
                      ? "bg-muted"
                      : "hover:bg-muted/50 cursor-pointer"
                  }
                  onClick={() => !editingId && handleStartEdit(pago)}
                >
                  {editingId === pago.id ? (
                    <>
                      <TableCell>
                        <Select
                          value={editingPago?.cliente_id}
                          onValueChange={(value) =>
                            setEditingPago({ ...editingPago!, cliente_id: value })
                          }
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
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editingPago?.descripcion}
                          onChange={(e) =>
                            setEditingPago({
                              ...editingPago!,
                              descripcion: e.target.value,
                            })
                          }
                          onKeyDown={handleKeyDown}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="date"
                          value={editingPago?.fecha_pago}
                          onChange={(e) =>
                            setEditingPago({
                              ...editingPago!,
                              fecha_pago: e.target.value,
                            })
                          }
                          onKeyDown={handleKeyDown}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={editingPago?.monto}
                          onChange={(e) =>
                            setEditingPago({
                              ...editingPago!,
                              monto: e.target.value,
                            })
                          }
                          onKeyDown={handleKeyDown}
                        />
                      </TableCell>
                      <TableCell>
                        {pago.moneda === "ARS" ? "$" : "U$D"} {pago.monto.toLocaleString()}
                      </TableCell>
                      <TableCell>{pago.moneda}</TableCell>
                      <TableCell>
                        <Select
                          value={editingPago?.estado}
                          onValueChange={(value) =>
                            setEditingPago({ ...editingPago!, estado: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pendiente">Pendiente</SelectItem>
                            <SelectItem value="Pagado">Pagado</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSave}>
                            Guardar
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleCancel}>
                            Cancelar
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: (pago as any).clientes?.color || "#ccc",
                            }}
                          />
                          {(pago as any).clientes?.nombre || "Sin cliente"}
                        </div>
                      </TableCell>
                      <TableCell>{pago.descripcion}</TableCell>
                      <TableCell>
                        {format(parseISO(pago.fecha_pago), "dd/MM/yyyy", { locale: es })}
                      </TableCell>
                      <TableCell>
                        {pago.moneda === "ARS" ? "$" : "U$D"} {pago.monto.toLocaleString()}
                      </TableCell>
                      <TableCell>{pago.moneda}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[120px]">
                              {pago.estado} <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCambiarEstado(pago, "Pagado");
                              }}
                            >
                              Pagado
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCambiarEstado(pago, "Pendiente");
                              }}
                            >
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit(pago);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEliminarPago(pago.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
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
                <TableHead>Moneda</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagosPagados.map((pago) => (
                <TableRow
                  key={pago.id}
                  className={
                    editingId === pago.id
                      ? "bg-muted"
                      : "hover:bg-muted/50 cursor-pointer"
                  }
                  onClick={() => !editingId && handleStartEdit(pago)}
                >
                  {editingId === pago.id ? (
                    <>
                      <TableCell>
                        <Select
                          value={editingPago?.cliente_id}
                          onValueChange={(value) =>
                            setEditingPago({ ...editingPago!, cliente_id: value })
                          }
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
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editingPago?.descripcion}
                          onChange={(e) =>
                            setEditingPago({
                              ...editingPago!,
                              descripcion: e.target.value,
                            })
                          }
                          onKeyDown={handleKeyDown}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="date"
                          value={editingPago?.fecha_pago}
                          onChange={(e) =>
                            setEditingPago({
                              ...editingPago!,
                              fecha_pago: e.target.value,
                            })
                          }
                          onKeyDown={handleKeyDown}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={editingPago?.monto}
                          onChange={(e) =>
                            setEditingPago({
                              ...editingPago!,
                              monto: e.target.value,
                            })
                          }
                          onKeyDown={handleKeyDown}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={editingPago?.moneda}
                          onValueChange={(value) =>
                            setEditingPago({ ...editingPago!, moneda: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ARS">ARS ($)</SelectItem>
                            <SelectItem value="USD">USD (U$D)</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={editingPago?.estado}
                          onValueChange={(value) =>
                            setEditingPago({ ...editingPago!, estado: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pendiente">Pendiente</SelectItem>
                            <SelectItem value="Pagado">Pagado</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSave}>
                            Guardar
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleCancel}>
                            Cancelar
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: (pago as any).clientes?.color || "#ccc",
                            }}
                          />
                          {(pago as any).clientes?.nombre || "Sin cliente"}
                        </div>
                      </TableCell>
                      <TableCell>{pago.descripcion}</TableCell>
                      <TableCell>
                        {format(parseISO(pago.fecha_pago), "dd/MM/yyyy", { locale: es })}
                      </TableCell>
                      <TableCell>
                        {pago.moneda === "ARS" ? "$" : "U$D"} {pago.monto.toLocaleString()}
                      </TableCell>
                      <TableCell>{pago.moneda}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[120px]">
                              {pago.estado} <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCambiarEstado(pago, "Pagado");
                              }}
                            >
                              Pagado
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCambiarEstado(pago, "Pendiente");
                              }}
                            >
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
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartEdit(pago);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEliminarPago(pago.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
} 