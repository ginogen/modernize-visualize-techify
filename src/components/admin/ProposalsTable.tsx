import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Edit, Clock, Check, X, DollarSign, Copy, ArchiveIcon, Search, FilterX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type InvestmentItem = {
  description: string;
};

type Proposal = {
  id: string;
  client_name: string;
  client_email: string;
  service: string;
  scope: string;
  investment: string;
  investment_items?: string[];
  investment_currency?: string;
  status: string;
  created_at: string;
  slug: string;
  opened: boolean;
  total_view_time: number;
  number_of_payments?: number;
  payment_schedule?: string;
};

type Filters = {
  clientName: string;
  clientEmail: string;
  date: Date | undefined;
  status: string;
  opened: string;
};

const ProposalsTable = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [duplicating, setDuplicating] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("abiertas");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    clientName: "",
    clientEmail: "",
    date: undefined,
    status: "all",
    opened: "all",
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProposals();
    
    // Set up automatic refresh every 30 seconds to see updates
    const refreshInterval = setInterval(() => {
      fetchProposals(true);
    }, 30000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    // Aplicar filtros a las propuestas
    if (proposals.length > 0) {
      let filtered = proposals.filter(proposal => 
        activeTab === "abiertas" 
          ? proposal.status !== "Archivada" 
          : proposal.status === "Archivada"
      );

      // Aplicar filtros adicionales
      if (filters.clientName) {
        filtered = filtered.filter(proposal => 
          proposal.client_name.toLowerCase().includes(filters.clientName.toLowerCase())
        );
      }

      if (filters.clientEmail) {
        filtered = filtered.filter(proposal => 
          proposal.client_email.toLowerCase().includes(filters.clientEmail.toLowerCase())
        );
      }

      if (filters.date) {
        const filterDate = format(filters.date, 'yyyy-MM-dd');
        filtered = filtered.filter(proposal => {
          const proposalDate = format(new Date(proposal.created_at), 'yyyy-MM-dd');
          return proposalDate === filterDate;
        });
      }

      if (filters.status && filters.status !== "all") {
        filtered = filtered.filter(proposal => proposal.status === filters.status);
      }

      if (filters.opened !== "" && filters.opened !== "all") {
        const isOpened = filters.opened === "Sí";
        filtered = filtered.filter(proposal => proposal.opened === isOpened);
      }

      setFilteredProposals(filtered);
      setCurrentPage(1); // Reiniciar a la primera página al cambiar los filtros
    }
  }, [activeTab, proposals, filters]);

  const fetchProposals = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setProposals(data || []);
      
      // Aplicar filtro inicial según la pestaña activa
      const filtered = (data || []).filter(proposal => 
        activeTab === "abiertas" 
          ? proposal.status !== "Archivada" 
          : proposal.status === "Archivada"
      );
      setFilteredProposals(filtered);
      
    } catch (error: any) {
      console.error('Error fetching proposals:', error.message);
      if (!silent) {
        toast({
          title: "Error",
          description: "No se pudieron cargar las propuestas.",
          variant: "destructive",
        });
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Aceptada':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'No Aceptada':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Enviada':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Archivada':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getStatusOptions = () => {
    const statuses = ['Pendiente', 'Enviada', 'Aceptada', 'No Aceptada'];
    if (activeTab === 'archivadas') {
      statuses.push('Archivada');
    }
    return statuses;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViewTime = (seconds: number) => {
    if (seconds === 0) return "No visto";
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes === 0) return `${remainingSeconds} seg`;
    return `${minutes} min ${remainingSeconds} seg`;
  };

  const formatInvestment = (proposal: Proposal) => {
    if (!proposal.investment) return "-";
    
    const paymentInfo = proposal.number_of_payments && proposal.number_of_payments > 1
      ? ` (${proposal.number_of_payments} pagos)`
      : "";
      
    return `${proposal.investment_currency || "$"}${proposal.investment}${paymentInfo}`;
  };

  const duplicateProposal = async (proposal: Proposal) => {
    try {
      setDuplicating(true);
      
      // Función para generar un slug único basado en el nombre del cliente
      const generateSlug = (name: string) => {
        // Crear un slug desde el nombre del cliente
        const baseSlug = name
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-')
          .trim();
        
        // Añadir un sufijo de fecha y aleatorio para garantizar la unicidad
        return `${baseSlug}-${Date.now().toString().slice(-8)}`;
      };
      
      // Crear una nueva propuesta basada en la existente
      const newProposal = {
        client_name: proposal.client_name,
        client_email: proposal.client_email,
        service: proposal.service,
        scope: proposal.scope,
        investment: proposal.investment,
        investment_items: proposal.investment_items,
        investment_currency: proposal.investment_currency,
        status: "Pendiente",  // Establecer estatus como pendiente para la nueva propuesta
        slug: generateSlug(proposal.client_name), // Generar un nuevo slug basado en el nombre del cliente
        opened: false,
        total_view_time: 0,
        number_of_payments: proposal.number_of_payments,
        payment_schedule: proposal.payment_schedule,
      };
      
      const { data, error } = await supabase
        .from('proposals')
        .insert([newProposal])
        .select();
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Propuesta duplicada",
        description: "La propuesta ha sido duplicada exitosamente.",
      });
      
      // Refrescar la lista de propuestas
      fetchProposals();
      
    } catch (error: any) {
      console.error('Error duplicando propuesta:', error.message);
      toast({
        title: "Error",
        description: "No se pudo duplicar la propuesta.",
        variant: "destructive",
      });
    } finally {
      setDuplicating(false);
    }
  };

  const archiveProposal = async (proposal: Proposal) => {
    try {
      setArchiving(true);
      
      const { error } = await supabase
        .from('proposals')
        .update({ status: "Archivada" })
        .eq('id', proposal.id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Propuesta archivada",
        description: "La propuesta ha sido archivada exitosamente.",
      });
      
      // Refrescar la lista de propuestas
      fetchProposals();
      
    } catch (error: any) {
      console.error('Error archivando propuesta:', error.message);
      toast({
        title: "Error",
        description: "No se pudo archivar la propuesta.",
        variant: "destructive",
      });
    } finally {
      setArchiving(false);
    }
  };

  // Cálculos para paginación
  const totalPages = Math.ceil(filteredProposals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProposals = filteredProposals.slice(startIndex, startIndex + itemsPerPage);
  
  // Función para generar enlaces de paginación
  const generatePaginationLinks = () => {
    const links = [];
    
    // Mostrar primera página
    links.push(
      <PaginationItem key="first">
        <PaginationLink 
          onClick={() => setCurrentPage(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Elipsis si hay muchas páginas antes
    if (currentPage > 3) {
      links.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Páginas alrededor de la actual
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Evitar duplicados de primera y última página
      links.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => setCurrentPage(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Elipsis si hay muchas páginas después
    if (currentPage < totalPages - 2) {
      links.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Mostrar última página si hay más de una
    if (totalPages > 1) {
      links.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => setCurrentPage(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return links;
  };

  // Función para resetear los filtros
  const resetFilters = () => {
    setFilters({
      clientName: "",
      clientEmail: "",
      date: undefined,
      status: "all",
      opened: "all",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Propuestas</h2>
        <Button onClick={() => navigate('/admin/proposals/create')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Propuesta
        </Button>
      </div>
      
      <Tabs 
        defaultValue="abiertas" 
        className="mb-6"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="abiertas">Abiertas</TabsTrigger>
          <TabsTrigger value="archivadas">Archivadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="abiertas" className="mt-4">
          {loading ? (
            <div className="text-center py-8">Cargando propuestas...</div>
          ) : filteredProposals.length === 0 ? (
            <div className="text-center py-8">
              {(filters.clientName || filters.clientEmail || filters.date || 
                filters.status !== "all" || filters.opened !== "all")
                ? "No hay propuestas que coincidan con los filtros."
                : "No hay propuestas abiertas."}
            </div>
          ) : renderProposalsTable()}
        </TabsContent>
        
        <TabsContent value="archivadas" className="mt-4">
      {loading ? (
        <div className="text-center py-8">Cargando propuestas...</div>
          ) : filteredProposals.length === 0 ? (
            <div className="text-center py-8">
              {(filters.clientName || filters.clientEmail || filters.date || 
                filters.status !== "all" || filters.opened !== "all")
                ? "No hay propuestas archivadas que coincidan con los filtros."
                : "No hay propuestas archivadas."}
            </div>
          ) : renderProposalsTable()}
        </TabsContent>
      </Tabs>
    </div>
  );
  
  function renderProposalsTable() {
    return (
      <>
        <div className="flex justify-between mb-4">
          <div>
            <Button 
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="mr-2"
            >
              {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
              {showFilters ? <FilterX className="ml-2 h-4 w-4" /> : <Search className="ml-2 h-4 w-4" />}
            </Button>
            
            {(filters.clientName || filters.clientEmail || filters.date || 
              filters.status !== "all" || filters.opened !== "all") && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-red-500 hover:text-red-700"
              >
                Limpiar Filtros
              </Button>
            )}
            
            {/* Badges para mostrar filtros activos */}
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.clientName && (
                <Badge variant="outline" className="bg-blue-50">
                  Cliente: {filters.clientName}
                </Badge>
              )}
              {filters.clientEmail && (
                <Badge variant="outline" className="bg-blue-50">
                  Email: {filters.clientEmail}
                </Badge>
              )}
              {filters.date && (
                <Badge variant="outline" className="bg-blue-50">
                  Fecha: {format(filters.date, 'dd/MM/yyyy')}
                </Badge>
              )}
              {filters.status && filters.status !== "all" && (
                <Badge variant="outline" className={cn("bg-blue-50", getStatusClass(filters.status))}>
                  Estado: {filters.status}
                </Badge>
              )}
              {filters.opened !== "all" && (
                <Badge variant="outline" className={filters.opened === "Sí" ? "bg-green-50" : "bg-red-50"}>
                  Abierto: {filters.opened}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span>Mostrar:</span>
            <Select 
              value={itemsPerPage.toString()} 
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Panel de filtros */}
        {showFilters && (
          <div className="border rounded-md p-4 mb-4 bg-slate-50">
            <h3 className="font-medium mb-3">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="clientNameFilter">Cliente</Label>
                <Input
                  id="clientNameFilter"
                  placeholder="Filtrar por cliente"
                  value={filters.clientName}
                  onChange={(e) => setFilters({...filters, clientName: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="clientEmailFilter">Email</Label>
                <Input
                  id="clientEmailFilter"
                  placeholder="Filtrar por email"
                  value={filters.clientEmail}
                  onChange={(e) => setFilters({...filters, clientEmail: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !filters.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.date ? (
                        format(filters.date, "PPP", { locale: es })
                      ) : (
                        <span>Seleccionar fecha</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.date}
                      onSelect={(date) => setFilters({...filters, date})}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="statusFilter">Estado</Label>
                <Select 
                  value={filters.status} 
                  onValueChange={(value) => setFilters({...filters, status: value})}
                >
                  <SelectTrigger id="statusFilter" className="mt-1">
                    <SelectValue placeholder="Todos los estados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {getStatusOptions().map(status => (
                      <SelectItem key={status} value={status}>
                        <div className="flex items-center">
                          <span className={`w-3 h-3 rounded-full mr-2 ${getStatusClass(status)}`}></span>
                          {status}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="openedFilter">Abierto</Label>
                <Select 
                  value={filters.opened} 
                  onValueChange={(value) => setFilters({...filters, opened: value})}
                >
                  <SelectTrigger id="openedFilter" className="mt-1">
                    <SelectValue placeholder="Abierto o no" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="Sí">Sí</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>Inversión</span>
                  </div>
                </TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Abierto</TableHead>
                <TableHead>Tiempo Visualización</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProposals.map((proposal) => (
                <TableRow key={proposal.id}>
                  <TableCell className="font-medium">{proposal.client_name}</TableCell>
                  <TableCell>{proposal.client_email}</TableCell>
                  <TableCell>{proposal.service}</TableCell>
                  <TableCell>{formatInvestment(proposal)}</TableCell>
                  <TableCell>{formatDate(proposal.created_at)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusClass(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {proposal.opened ? (
                      <div className="flex items-center text-green-600">
                        <Check className="h-5 w-5 mr-1" />
                        <span>Sí</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <X className="h-5 w-5 mr-1" />
                        <span>No</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{formatViewTime(proposal.total_view_time)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link to={`/propuesta/${proposal.slug}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </Link>
                      <Link to={`/admin/proposals/edit/${proposal.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => duplicateProposal(proposal)}
                        disabled={duplicating}
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Duplicar
                      </Button>
                      {activeTab === "abiertas" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => archiveProposal(proposal)}
                          disabled={archiving}
                        >
                          <ArchiveIcon className="h-4 w-4 mr-1" />
                          Archivar
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {generatePaginationLinks()}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && setCurrentPage(prev => prev + 1)} 
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </>
    );
  }
};

export default ProposalsTable;
