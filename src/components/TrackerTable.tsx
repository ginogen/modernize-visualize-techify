import { useState, useRef } from 'react';
import { format, addWeeks, isBefore, parseISO, differenceInDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { Plus, Calendar, User, ChevronDown, Archive, ListTodo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Tarea, TareaFormData } from '@/lib/types';
import { useTracker } from '@/contexts/TrackerContext';

export function TrackerTable() {
  const { clientes, tareas, addTarea, updateTarea } = useTracker();
  const [open, setOpen] = useState(false);
  const [editingTarea, setEditingTarea] = useState<Tarea | null>(null);
  const [isQuickAdding, setIsQuickAdding] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [newTarea, setNewTarea] = useState<Partial<TareaFormData>>({});
  const [editingField, setEditingField] = useState<{ tareaId: string; field: 'cliente_id' | 'fecha_estimada' } | null>(null);
  const quickAddInputRef = useRef<HTMLInputElement>(null);

  const sortTareas = (tareas: Tarea[]) => {
    return [...tareas]
      .filter(tarea => showArchived ? tarea.completada : !tarea.completada)
      .sort((a, b) => {
        if (!a.fecha_estimada) return 1;
        if (!b.fecha_estimada) return -1;
        return new Date(a.fecha_estimada).getTime() - new Date(b.fecha_estimada).getTime();
      });
  };

  const getRowColor = (fechaEstimada: string | undefined) => {
    if (!fechaEstimada) return '';
    const oneWeekFromNow = addWeeks(new Date(), 1);
    if (isBefore(new Date(fechaEstimada), oneWeekFromNow)) {
      return 'bg-red-50';
    }
    return '';
  };

  const getDaysRemaining = (fechaEstimada: string | undefined) => {
    if (!fechaEstimada) return null;
    const today = new Date();
    const days = differenceInDays(new Date(fechaEstimada), today);
    
    if (days < 0) {
      return `Vencida hace ${Math.abs(days)} días`;
    } else if (days === 0) {
      return 'Vence hoy';
    } else if (days === 1) {
      return 'Vence mañana';
    } else {
      return `${days} días restantes`;
    }
  };

  const handleQuickAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && quickAddInputRef.current?.value) {
      const tareaData: TareaFormData = {
        descripcion: quickAddInputRef.current.value,
        ...newTarea,
        completada: false
      };
      addTarea(tareaData);
      quickAddInputRef.current.value = '';
      setNewTarea({});
      setIsQuickAdding(false);
    } else if (e.key === 'Escape') {
      setIsQuickAdding(false);
      setNewTarea({});
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const tareaData: TareaFormData = {
      descripcion: formData.get('descripcion') as string,
      cliente_id: formData.get('cliente_id') as string || undefined,
      fecha_estimada: formData.get('fecha_estimada') ? new Date(formData.get('fecha_estimada') as string).toISOString() : undefined,
      completada: false
    };

    if (editingTarea) {
      updateTarea(editingTarea.id, tareaData);
    } else {
      addTarea(tareaData);
    }
    
    setOpen(false);
    setEditingTarea(null);
  };

  const handleTareaClick = (tarea: Tarea) => {
    setEditingTarea(tarea);
    setOpen(true);
  };

  const handleFieldClick = (e: React.MouseEvent, tarea: Tarea, field: 'cliente_id' | 'fecha_estimada') => {
    e.stopPropagation();
    setEditingField({ tareaId: tarea.id, field });
  };

  const handleFieldUpdate = (tarea: Tarea, field: 'cliente_id' | 'fecha_estimada', value: any) => {
    updateTarea(tarea.id, { [field]: value });
    setEditingField(null);
  };

  const getClienteColor = (clienteId?: string) => {
    if (!clienteId) return 'bg-gray-100';
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? `bg-[${cliente.color}]` : 'bg-gray-100';
  };

  const sortedTareas = sortTareas(tareas);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Tareas</h2>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Tabs
            defaultValue="pendientes"
            className="w-full md:w-auto"
            onValueChange={(value) => setShowArchived(value === 'completadas')}
          >
            <TabsList>
              <TabsTrigger value="pendientes" className="flex items-center gap-2">
                <ListTodo className="w-4 h-4" />
                Pendientes
              </TabsTrigger>
              <TabsTrigger value="completadas" className="flex items-center gap-2">
                <Archive className="w-4 h-4" />
                Completadas
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="icon">
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingTarea ? 'Editar Tarea' : 'Crear Nueva Tarea'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  name="descripcion"
                  placeholder="Descripción de la tarea"
                  defaultValue={editingTarea?.descripcion}
                  required
                />
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <Select name="cliente_id" defaultValue={editingTarea?.cliente_id}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccionar Cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.map((cliente) => (
                        <SelectItem key={cliente.id} value={cliente.id}>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: cliente.color }}
                            />
                            <span>{cliente.nombre}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <Input
                    name="fecha_estimada"
                    type="date"
                    className="w-full"
                    defaultValue={editingTarea?.fecha_estimada ? format(new Date(editingTarea.fecha_estimada), 'yyyy-MM-dd') : ''}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingTarea ? 'Guardar Cambios' : 'Crear Tarea'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="hidden md:table-cell">Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Fecha Estimada</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isQuickAdding && (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="flex items-center gap-4">
                    <Input
                      ref={quickAddInputRef}
                      placeholder="Presiona Enter para crear la tarea..."
                      className="flex-1"
                      onKeyDown={handleQuickAdd}
                      autoFocus
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isQuickAdding && (
              <TableRow className="hover:bg-gray-50 cursor-pointer" onClick={() => setIsQuickAdding(true)}>
                <TableCell colSpan={4}>
                  <span className="text-gray-500">+ Agregar nueva tarea...</span>
                </TableCell>
              </TableRow>
            )}
            {sortedTareas.map((tarea) => (
              <TableRow
                key={tarea.id}
                className={`${getRowColor(tarea.fecha_estimada)} hover:bg-gray-50 transition-colors`}
              >
                <TableCell className="w-[50px]">
                  <Checkbox
                    checked={tarea.completada}
                    onCheckedChange={() => updateTarea(tarea.id, { completada: !tarea.completada })}
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="font-medium" onClick={() => handleTareaClick(tarea)}>
                  {tarea.descripcion}
                </TableCell>
                <TableCell 
                  className="hidden md:table-cell cursor-pointer hover:bg-gray-100"
                  onClick={(e) => handleFieldClick(e, tarea, 'cliente_id')}
                >
                  {editingField?.tareaId === tarea.id && editingField.field === 'cliente_id' ? (
                    <Select
                      value={tarea.cliente_id}
                      onValueChange={(value) => handleFieldUpdate(tarea, 'cliente_id', value)}
                      onOpenChange={(open) => !open && setEditingField(null)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccionar Cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientes.map((cliente) => (
                          <SelectItem key={cliente.id} value={cliente.id}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: cliente.color }}
                              />
                              <span>{cliente.nombre}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2">
                      {tarea.cliente_id && (
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: clientes.find(c => c.id === tarea.cliente_id)?.color }}
                        />
                      )}
                      <span>{clientes.find(c => c.id === tarea.cliente_id)?.nombre || 'Sin cliente'}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell 
                  className="hidden md:table-cell cursor-pointer hover:bg-gray-100"
                  onClick={(e) => handleFieldClick(e, tarea, 'fecha_estimada')}
                >
                  {editingField?.tareaId === tarea.id && editingField.field === 'fecha_estimada' ? (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full">
                          {tarea.fecha_estimada ? 
                            format(new Date(tarea.fecha_estimada), 'dd/MM/yyyy', { locale: es }) : 
                            'Seleccionar fecha'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={tarea.fecha_estimada ? new Date(tarea.fecha_estimada) : undefined}
                          onSelect={(date) => handleFieldUpdate(tarea, 'fecha_estimada', date?.toISOString())}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        {tarea.fecha_estimada ? (
                          <>
                            {format(new Date(tarea.fecha_estimada), 'dd/MM/yyyy', { locale: es })}
                            <span className="ml-2 text-sm text-gray-500">
                              ({getDaysRemaining(tarea.fecha_estimada)})
                            </span>
                          </>
                        ) : (
                          'Sin fecha'
                        )}
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 