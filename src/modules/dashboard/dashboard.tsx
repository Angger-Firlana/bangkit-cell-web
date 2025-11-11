import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Smartphone, Wrench, DollarSign, Package, Building } from 'lucide-react';
import type { DashboardStats } from '../../types';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen);
  };

  const stats: DashboardStats = {
    totalServices: 6,
    totalDevices: 5,
    totalBrands: 5,
    totalUsers: 3,
    activeTransactions: 9,
    totalRevenue: 13200000
  };

  const salesData = [
    { day: 'Sen', services: 12, devices: 8, revenue: 3200000 },
    { day: 'Sel', services: 8, devices: 12, revenue: 2800000 },
    { day: 'Rab', services: 15, devices: 6, revenue: 4200000 },
    { day: 'Kam', services: 10, devices: 9, revenue: 3100000 },
    { day: 'Jum', services: 18, devices: 14, revenue: 5200000 },
    { day: 'Sab', services: 22, devices: 18, revenue: 6800000 },
    { day: 'Min', services: 14, devices: 11, revenue: 4500000 },
  ];

  const deviceDistribution = [
    { name: 'iPhone', value: 45 },
    { name: 'Samsung', value: 25 },
    { name: 'Xiaomi', value: 15 },
    { name: 'Oppo', value: 10 },
    { name: 'Vivo', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const recentActivities = [
    { id: 1, action: 'Perbaikan iPhone 15 Pro - Ganti LCD', time: '2 jam lalu', status: 'completed' },
    { id: 2, action: 'Penggantian baterai Samsung S23', time: '4 jam lalu', status: 'in-progress' },
    { id: 3, action: 'Service iPad Air - Ganti speaker', time: '6 jam lalu', status: 'completed' },
    { id: 4, action: 'Tambah stok LCD iPhone 15', time: '1 hari lalu', status: 'completed' },
  ];

  const cards = [
    {
      title: 'Total Services',
      value: stats.totalServices,
      icon: Wrench,
      color: 'bg-blue-500',
      description: 'Jenis layanan tersedia'
    },
    {
      title: 'Total Devices',
      value: stats.totalDevices,
      icon: Smartphone,
      color: 'bg-green-500',
      description: 'Model perangkat'
    },
    {
      title: 'Total Brands',
      value: stats.totalBrands,
      icon: Building,
      color: 'bg-purple-500',
      description: 'Merek terdaftar'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-orange-500',
      description: 'Admin & Operator'
    },
    {
      title: 'Active Transactions',
      value: stats.activeTransactions,
      icon: Package,
      color: 'bg-red-500',
      description: 'Transaksi pending'
    },
    {
      title: 'Total Revenue',
      value: `Rp ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-teal-500',
      description: 'Pendapatan total'
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
   
      <div className="flex-1 flex flex-col overflow-hidden">
        
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{card.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                    </div>
                    <div className={`${card.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Revenue</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`Rp ${Number(value).toLocaleString()}`, 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="#0d9488" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Device Distribution */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name = '', percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}

                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {deviceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {activity.status === 'completed' ? 'Selesai' : 'Dalam Proses'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;