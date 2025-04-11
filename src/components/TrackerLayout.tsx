import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TrackerSidebar } from './TrackerSidebar';
import { TrackerTable } from './TrackerTable';
import { ClientesTable } from './ClientesTable';
import { PagosTable } from './PagosTable';
import { TrackerProvider } from '@/contexts/TrackerContext';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TrackerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <TrackerProvider>
      <div className="flex h-screen bg-gray-50 relative">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 md:hidden z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <TrackerSidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto md:ml-0">
          <Routes>
            <Route path="/" element={<TrackerTable />} />
            <Route path="/clientes" element={<ClientesTable />} />
            <Route path="/pagos" element={<PagosTable />} />
          </Routes>
        </div>
      </div>
    </TrackerProvider>
  );
} 