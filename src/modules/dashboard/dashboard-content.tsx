import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { PieLabelRenderProps } from 'recharts';
import DashboardCards from '../../shared/components/dashboard-cards';
import { DashboardStats } from '../../../types';

const DashboardContent: React.FC = () => {
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

  return (
    <div className="p-6">
      <DashboardCards stats={stats} />

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
                  label={(props: PieLabelRenderProps) =>
                    `${props.name ?? ''} ${((props.percent ?? 0) * 100).toFixed(0)}%`
                  }
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
    </div>
  );
};

export default DashboardContent;