import { useState, useRef } from 'react';
import { Plus, Mail, Phone, Globe, Building, CreditCard, ChevronDown, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Cliente, ClienteFormData } from '@/lib/types';
import { useTracker } from '@/contexts/TrackerContext';

export function ClientesTable() {
  const { clientes, addCliente, updateCliente, deleteCliente } = useTracker();
  const [open, setOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);
  const [isQuickAdding, setIsQuickAdding] = useState(false);
  const [newCliente, setNewCliente] = useState<Partial<ClienteFormData>>({});
  const quickAddInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const clienteData: ClienteFormData = {
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string || undefined,
      telefono: formData.get('telefono') as string || undefined,
      pais: formData.get('pais') as string || undefined,
      cuit: formData.get('cuit') as string || undefined,
      condicion: formData.get('condicion') as string || undefined,
    };

    if (editingCliente) {
      const updatedCliente: Cliente = {
        ...editingCliente,
        ...clienteData,
      };
      updateCliente(updatedCliente);
    } else {
      addCliente(clienteData);
    }

    setOpen(false);
    setEditingCliente(null);
    (e.target as HTMLFormElement).reset();
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setOpen(true);
  };

  const handleDelete = (cliente: Cliente) => {
    setClienteToDelete(cliente);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (clienteToDelete) {
      deleteCliente(clienteToDelete.id);
      setDeleteDialogOpen(false);
      setClienteToDelete(null);
    }
  };

  const handleQuickAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && quickAddInputRef.current?.value) {
      const clienteData: ClienteFormData = {
        nombre: quickAddInputRef.current.value,
        ...newCliente,
      };
      addCliente(clienteData);
      quickAddInputRef.current.value = '';
      setNewCliente({});
      setIsQuickAdding(false);
    } else if (e.key === 'Escape') {
      setIsQuickAdding(false);
      setNewCliente({});
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">Clientes</h2>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) setEditingCliente(null);
        }}>
          <DialogTrigger asChild>
            <Button className="w-full md:w-auto">
              <ChevronDown className="w-4 h-4 mr-2" />
              Opciones Avanzadas
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCliente ? 'Editar Cliente' : 'Crear Nuevo Cliente'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <Input 
                  name="nombre" 
                  placeholder="Nombre del Cliente" 
                  defaultValue={editingCliente?.nombre}
                  required 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="Email"
                  defaultValue={editingCliente?.email}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <Input 
                  name="telefono" 
                  placeholder="Teléfono"
                  defaultValue={editingCliente?.telefono}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <Input 
                  name="pais" 
                  placeholder="País"
                  defaultValue={editingCliente?.pais}
                />
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <Input 
                  name="cuit" 
                  placeholder="CUIT"
                  defaultValue={editingCliente?.cuit}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <Input 
                  name="condicion" 
                  placeholder="Condición"
                  defaultValue={editingCliente?.condicion}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingCliente ? 'Guardar Cambios' : 'Crear Cliente'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Teléfono</TableHead>
              <TableHead className="hidden lg:table-cell">País</TableHead>
              <TableHead className="hidden lg:table-cell">CUIT</TableHead>
              <TableHead className="hidden lg:table-cell">Condición</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => !isQuickAdding && setIsQuickAdding(true)}
            >
              <TableCell>
                <div className="w-4 h-4 rounded-full bg-gray-100" />
              </TableCell>
              <TableCell colSpan={7} className="relative">
                {isQuickAdding ? (
                  <div className="flex items-center gap-4">
                    <Input
                      ref={quickAddInputRef}
                      placeholder="Nombre del cliente y presiona Enter..."
                      className="w-full"
                      autoFocus
                      onKeyDown={handleQuickAdd}
                      onBlur={() => {
                        if (!newCliente.email && !newCliente.telefono) {
                          setIsQuickAdding(false);
                          setNewCliente({});
                        }
                      }}
                    />
                    <Input
                      placeholder="Email"
                      className="w-[200px]"
                      value={newCliente.email || ''}
                      onChange={(e) => setNewCliente({ ...newCliente, email: e.target.value })}
                    />
                    <Input
                      placeholder="Teléfono"
                      className="w-[200px]"
                      value={newCliente.telefono || ''}
                      onChange={(e) => setNewCliente({ ...newCliente, telefono: e.target.value })}
                    />
                  </div>
                ) : (
                  <span className="text-gray-500">+ Agregar nuevo cliente...</span>
                )}
              </TableCell>
            </TableRow>
            {clientes.map((cliente) => (
              <TableRow 
                key={cliente.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: cliente.color }}
                    title={`Color identificador: ${cliente.color}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div>{cliente.nombre}</div>
                  <div className="md:hidden text-sm text-gray-500">
                    {cliente.email && <div>{cliente.email}</div>}
                    {cliente.telefono && <div>{cliente.telefono}</div>}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{cliente.email}</TableCell>
                <TableCell className="hidden md:table-cell">{cliente.telefono}</TableCell>
                <TableCell className="hidden lg:table-cell">{cliente.pais}</TableCell>
                <TableCell className="hidden lg:table-cell">{cliente.cuit}</TableCell>
                <TableCell className="hidden lg:table-cell">{cliente.condicion}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(cliente)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDelete(cliente)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {!isQuickAdding && clientes.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No hay clientes. ¡Crea uno nuevo!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el cliente "{clienteToDelete?.nombre}" y todas sus tareas asociadas.
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 