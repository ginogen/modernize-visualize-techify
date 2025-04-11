import { Link, useLocation } from 'react-router-dom';
import { ClipboardList, Users, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackerSidebarProps {
  onClose?: () => void;
}

export function TrackerSidebar({ onClose }: TrackerSidebarProps) {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Tracker',
      icon: ClipboardList,
      path: '/tracker'
    },
    {
      title: 'Clientes',
      icon: Users,
      path: '/tracker/clientes'
    },
    {
      title: 'Pagos',
      icon: CreditCard,
      path: '/tracker/pagos'
    }
  ];

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-2 mt-14 md:mt-0">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={handleClick}
            className={cn(
              'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
              'hover:bg-gray-100',
              location.pathname === item.path ? 'bg-gray-100' : 'text-gray-700'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
} 