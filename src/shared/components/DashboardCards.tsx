import React from 'react';
import { Users, Smartphone, Wrench, DollarSign, Package, Building } from 'lucide-react';
import type { DashboardStats } from '../../types';

interface DashboardCardsProps {
  stats: DashboardStats;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ stats }) => {
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
  );
};

export default DashboardCards;