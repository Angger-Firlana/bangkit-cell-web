import React, { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Sidebar 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;