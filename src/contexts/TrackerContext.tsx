import { createContext, useContext, useEffect, useState } from 'react';
import { Cliente, ClienteFormData, Tarea, TareaFormData } from '../lib/types';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface TrackerContextType {
  clientes: Cliente[];
  tareas: Tarea[];
  addCliente: (clienteData: ClienteFormData) => Promise<void>;
  updateCliente: (id: string, clienteData: Partial<ClienteFormData>) => Promise<void>;
  deleteCliente: (id: string) => Promise<void>;
  addTarea: (tareaData: TareaFormData) => Promise<void>;
  updateTarea: (id: string, tareaData: Partial<TareaFormData>) => Promise<void>;
  deleteTarea: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

export function TrackerProvider({ children }: { children: React.ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    loadInitialData();
  }, [user]);

  const loadInitialData = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const [{ data: clientesData, error: clientesError }, { data: tareasData, error: tareasError }] = await Promise.all([
        supabase.from('clientes').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('tareas').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      ]);

      if (clientesError) throw clientesError;
      if (tareasError) throw tareasError;

      setClientes(clientesData || []);
      setTareas(tareasData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailableColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
      '#D4A5A5', '#9B9B9B', '#A8E6CF', '#DCEDC1', '#FFD3B6',
      '#FF8B94', '#91A6FF', '#BFACE2', '#EBC7E6', '#A0D2DB'
    ];
    
    const usedColors = new Set(clientes.map(c => c.color));
    const availableColor = colors.find(c => !usedColors.has(c));
    return availableColor || `#${Math.floor(Math.random()*16777215).toString(16)}`;
  };

  const addCliente = async (clienteData: ClienteFormData) => {
    if (!user) throw new Error('Usuario no autenticado');
    try {
      const newCliente = {
        ...clienteData,
        color: getAvailableColor(),
        created_at: new Date().toISOString(),
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('clientes')
        .insert([newCliente])
        .select()
        .single();

      if (error) throw error;
      setClientes(prev => [data, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el cliente');
      throw err;
    }
  };

  const updateCliente = async (id: string, clienteData: Partial<ClienteFormData>) => {
    if (!user) throw new Error('Usuario no autenticado');
    try {
      const { data, error } = await supabase
        .from('clientes')
        .update(clienteData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setClientes(prev => prev.map(c => c.id === id ? data : c));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el cliente');
      throw err;
    }
  };

  const deleteCliente = async (id: string) => {
    if (!user) throw new Error('Usuario no autenticado');
    try {
      // Primero eliminamos las tareas asociadas
      await supabase
        .from('tareas')
        .delete()
        .eq('cliente_id', id)
        .eq('user_id', user.id);

      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setTareas(prev => prev.filter(t => t.cliente_id !== id));
      setClientes(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el cliente');
      throw err;
    }
  };

  const addTarea = async (tareaData: TareaFormData) => {
    if (!user) throw new Error('Usuario no autenticado');
    try {
      const newTarea = {
        ...tareaData,
        completada: tareaData.completada ?? false,
        created_at: new Date().toISOString(),
        user_id: user.id
      };

      console.log('Creando tarea:', newTarea); // Para debugging

      const { data, error } = await supabase
        .from('tareas')
        .insert([newTarea])
        .select()
        .single();

      if (error) {
        console.error('Error al crear tarea:', error); // Para debugging
        throw error;
      }
      
      console.log('Tarea creada:', data); // Para debugging
      setTareas(prev => [data, ...prev]);
    } catch (err) {
      console.error('Error completo:', err); // Para debugging
      setError(err instanceof Error ? err.message : 'Error al crear la tarea');
      throw err;
    }
  };

  const updateTarea = async (id: string, tareaData: Partial<TareaFormData>) => {
    if (!user) throw new Error('Usuario no autenticado');
    try {
      const { data, error } = await supabase
        .from('tareas')
        .update(tareaData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setTareas(prev => prev.map(t => t.id === id ? data : t));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la tarea');
      throw err;
    }
  };

  const deleteTarea = async (id: string) => {
    if (!user) throw new Error('Usuario no autenticado');
    try {
      const { error } = await supabase
        .from('tareas')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      setTareas(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la tarea');
      throw err;
    }
  };

  return (
    <TrackerContext.Provider value={{
      clientes,
      tareas,
      addCliente,
      updateCliente,
      deleteCliente,
      addTarea,
      updateTarea,
      deleteTarea,
      isLoading,
      error
    }}>
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const context = useContext(TrackerContext);
  if (context === undefined) {
    throw new Error('useTracker debe ser usado dentro de un TrackerProvider');
  }
  return context;
} 