import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Settings, Smartphone, Wrench, 
  BarChart3, Users, History, X, LogOut
} from 'lucide-react';
import { logout } from '../../services/authService';
import type { MenuItem } from '../../types';

const Sidebar: React.FC<any> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const [showUserModal, setShowUserModal] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/bangkit-cell/dashboard' },
    { id: 'services', label: 'Services', icon: Wrench, path: '/bangkit-cell/dashboard/services' },
    { id: 'devices', label: 'Devices', icon: Smartphone, path: '/bangkit-cell/dashboard/devices' },
    { id: 'device-variants', label: 'Device Variants', icon: Settings, path: '/bangkit-cell/dashboard/device-variants' },
    { id: 'sales-report', label: 'Sales Report', icon: BarChart3, path: '/bangkit-cell/dashboard/sales-report' },
    { id: 'users', label: 'Users', icon: Users, path: '/bangkit-cell/dashboard/users' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    window.location.replace('/bangkit-cell/auth/');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 
          bg-gray-800 text-white transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <h1 className="text-xl font-bold">
              <span className="text-red-500">Bangkit</span>Cell
            </h1>
            <span className="text-xs bg-teal-500 px-2 py-1 rounded ml-2">Admin</span>
          </div>
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-1 hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition
                      ${isActive(item.path)
                        ? "bg-teal-500 text-white" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"}
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Info Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">

          {/* User info clickable */}
          <button
            onClick={() => setShowUserModal(true)}
            className="flex items-center gap-3 w-full text-left"
          >
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@bangkitcell.com</p>
            </div>
          </button>
        </div>
      </div>

      {/* Overlay small user modal */}
      {showUserModal && (
        <div 
          className="fixed inset-0 bg-black/40 z-[999]"
          onClick={() => setShowUserModal(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-6 left-6 bg-gray-800 text-white w-56 rounded-xl p-3 shadow-xl border border-gray-700"
          >
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-400 hover:bg-red-600 hover:text-white transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Sidebar;
