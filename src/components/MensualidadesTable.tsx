import { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, DollarSign, Filter } from 'lucide-react';
import { useTracker } from '@/contexts/TrackerContext';

export function MensualidadesTable() {
  const { clientes, mensualidades, updateMensualidad } = useTracker();
  const [meses, setMeses] = useState<string[]>([]);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [filtros, setFiltros] = useState({
    plataforma: 'todas',
    moneda: 'todas',
    activos: 'todos'
  });

  useEffect(() => {
    // Generar los próximos 12 meses
    const mesesArray = [];
    const hoy = new Date();
    for (let i = 0; i < 12; i++) {
      const mes = addMonths(hoy, i);
      mesesArray.push(format(mes, 'yyyy-MM', { locale: es }));
    }
    setMeses(mesesArray);
  }, []);

  const handleToggleSuscripcion = async (clienteId: string, activa: boolean) => {
    try {
      const mensualidad = mensualidades.find(m => m.cliente_id === clienteId);
      if (!activa) {
        // Si se desactiva, limpiar la plataforma
        await updateMensualidad(clienteId, { 
          suscripcion_activa: false,
          plataforma: null
        });
      } else {
        // Si se activa, mantener la plataforma actual o establecer una por defecto
        await updateMensualidad(clienteId, { 
          suscripcion_activa: true,
          plataforma: mensualidad?.plataforma || 'Stripe'
        });
      }
    } catch (error) {
      console.error('Error al actualizar suscripción:', error);
    }
  };

  const handlePlataformaChange = async (clienteId: string, plataforma: string) => {
    try {
      // Al cambiar la plataforma, asegurar que la suscripción esté activa
      await updateMensualidad(clienteId, { 
        plataforma: plataforma as 'Stripe' | 'MercadoPago' | 'Transferencia',
        suscripcion_activa: true
      });
    } catch (error) {
      console.error('Error al actualizar plataforma:', error);
    }
  };

  const handleMonedaChange = async (clienteId: string, moneda: string) => {
    try {
      await updateMensualidad(clienteId, { 
        moneda: moneda as 'ARS' | 'USD'
      });
    } catch (error) {
      console.error('Error al actualizar moneda:', error);
    }
  };

  const handleMontoChange = async (clienteId: string, mes: string, monto: number, moneda: string) => {
    try {
      const mensualidad = mensualidades.find(m => m.cliente_id === clienteId);
      const pagos = mensualidad?.pagos || {};
      await updateMensualidad(clienteId, {
        pagos: {
          ...pagos,
          [`${mes}_${moneda}`]: monto
        }
      });
    } catch (error) {
      console.error('Error al actualizar monto:', error);
    }
  };

  const toggleCard = (clienteId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [clienteId]: !prev[clienteId]
    }));
  };

  const getTotalPorMes = (mes: string, moneda: string) => {
    return mensualidades.reduce((total, mensualidad) => {
      const monto = mensualidad.pagos?.[`${mes}_${moneda}`] || 0;
      return total + monto;
    }, 0);
  };

  const getMesAnterior = () => format(subMonths(new Date(), 1), 'yyyy-MM', { locale: es });
  const getMesActual = () => format(new Date(), 'yyyy-MM', { locale: es });
  const getProximoMes = () => format(addMonths(new Date(), 1), 'yyyy-MM', { locale: es });

  const getMontoActual = (mensualidad: any) => {
    const mesActual = getMesActual();
    const moneda = mensualidad?.moneda || 'ARS';
    return mensualidad?.pagos?.[`${mesActual}_${moneda}`] || 0;
  };

  const clientesFiltrados = clientes.filter(cliente => {
    const mensualidad = mensualidades.find(m => m.cliente_id === cliente.id);
    
    if (filtros.plataforma !== 'todas' && mensualidad?.plataforma !== filtros.plataforma) {
      return false;
    }
    
    if (filtros.activos === 'activos' && !mensualidad?.suscripcion_activa) {
      return false;
    }
    
    if (filtros.activos === 'inactivos' && mensualidad?.suscripcion_activa) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-semibold mb-6">Mensualidades</h2>
      
      {/* Resumen de totales por mes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { mes: getMesAnterior(), label: 'Mes Anterior' },
          { mes: getMesActual(), label: 'Mes Actual' },
          { mes: getProximoMes(), label: 'Próximo Mes' }
        ].map(({ mes, label }) => (
          <div key={mes} className="space-y-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {label} - {format(new Date(mes), 'MMMM yyyy', { locale: es })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total en $</span>
                    <span className="font-semibold">${getTotalPorMes(mes, 'ARS').toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total en U$D</span>
                    <span className="font-semibold">U$D {getTotalPorMes(mes, 'USD').toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filtros:</span>
        </div>
        <Select
          value={filtros.plataforma}
          onValueChange={(value) => setFiltros(prev => ({ ...prev, plataforma: value }))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Plataforma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas</SelectItem>
            <SelectItem value="Stripe">Stripe</SelectItem>
            <SelectItem value="MercadoPago">MercadoPago</SelectItem>
            <SelectItem value="Transferencia">Transferencia</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filtros.activos}
          onValueChange={(value) => setFiltros(prev => ({ ...prev, activos: value }))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="activos">Activos</SelectItem>
            <SelectItem value="inactivos">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de clientes */}
      <div className="grid gap-4">
        {clientesFiltrados.map((cliente) => {
          const mensualidad = mensualidades.find(m => m.cliente_id === cliente.id);
          const isExpanded = expandedCards[cliente.id] || false;
          const montoActual = getMontoActual(mensualidad);

          return (
            <Card key={cliente.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CardTitle className="flex items-center gap-2">
                      <span>{cliente.nombre}</span>
                      <Switch
                        checked={mensualidad?.suscripcion_activa || false}
                        onCheckedChange={(checked) => handleToggleSuscripcion(cliente.id, checked)}
                      />
                    </CardTitle>
                    {!isExpanded && (
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Plataforma:</span>
                          <span>{mensualidad?.plataforma || 'No seleccionada'}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Moneda:</span>
                          <span>{mensualidad?.moneda === 'ARS' ? '$' : 'U$D'}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="font-medium">Monto:</span>
                          <span>{mensualidad?.moneda === 'ARS' ? '$' : 'U$D'} {montoActual.toLocaleString()}</span>
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleCard(cliente.id)}
                    className="h-8 w-8"
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              {isExpanded && (
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Plataforma:</span>
                        <Select
                          value={mensualidad?.plataforma || ''}
                          onValueChange={(value) => handlePlataformaChange(cliente.id, value)}
                          disabled={!mensualidad?.suscripcion_activa}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Seleccionar plataforma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Stripe">Stripe</SelectItem>
                            <SelectItem value="MercadoPago">MercadoPago</SelectItem>
                            <SelectItem value="Transferencia">Transferencia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Moneda:</span>
                        <Select
                          value={mensualidad?.moneda || 'ARS'}
                          onValueChange={(value) => handleMonedaChange(cliente.id, value)}
                          disabled={!mensualidad?.suscripcion_activa}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Seleccionar moneda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ARS">$ (ARS)</SelectItem>
                            <SelectItem value="USD">U$D</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {meses.map((mes) => (
                        <div key={mes} className="space-y-2">
                          <label className="text-sm font-medium">{format(new Date(mes), 'MMM yyyy', { locale: es })}</label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{mensualidad?.moneda === 'ARS' ? '$' : 'U$D'}</span>
                            <Input
                              type="number"
                              value={mensualidad?.pagos?.[`${mes}_${mensualidad?.moneda || 'ARS'}`] || ''}
                              onChange={(e) => handleMontoChange(cliente.id, mes, Number(e.target.value), mensualidad?.moneda || 'ARS')}
                              placeholder="Monto"
                              disabled={!mensualidad?.suscripcion_activa}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
} 