import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const location = useLocation();

  const getPageTitle = (): string => {
    const titles: { [key: string]: string } = {
      '/bangkit-cell/dashboard': 'Dashboard',
      '/bangkit-cell/services': 'Services Management',
      '/bangkit-cell/devices': 'Devices Management',
      '/bangkit-cell/device-variants': 'Device Service Variants',
      '/bangkit-cell/sales-report': 'Sales Report',
      '/bangkit-cell/users': 'Users Management'
    };
    return titles[location.pathname] || 'Dashboard';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none focus:outline-none text-sm w-48"
            />
          </div>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;