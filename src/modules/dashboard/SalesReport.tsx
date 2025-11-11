import React, { useState } from 'react';
import { Download, Filter, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { Transaction } from '../../types';

const SalesReport: React.FC = () => {
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      id_operator: 1,
      status: 'pending',
      metode_pembayaran: null,
      jumlah_bayar: null,
      kembalian: null,
      qris_reference: null,
      total: 3200000,
      created_at: '2025-11-04 06:38:27',
      updated_at: '2025-11-04 06:38:27',
      customer_name: '',
      customer_phone: ''
    },
    {
      id: 8,
      id_operator: 1,
      status: 'pending',
      metode_pembayaran: 'other',
      jumlah_bayar: 1000000,
      kembalian: 10000,
      qris_reference: null,
      total: 3200000,
      created_at: '2025-11-08 05:25:18',
      updated_at: '2025-11-08 05:25:18',
      customer_name: 'Ahmad Fauzi',
      customer_phone: '081234567890'
    },
    {
      id: 9,
      id_operator: 3,
      status: 'pending',
      metode_pembayaran: 'cash',
      jumlah_bayar: 100000,
      kembalian: 100000,
      total: 0,
      qris_reference: null,
      created_at: '2025-11-08 08:36:36',
      updated_at: '2025-11-08 08:36:36',
      customer_name: 'Angger Firlana',
      customer_phone: '0895630354567'
    }
  ]);

  const salesData = [
    { month: 'Jan', revenue: 45000000, transactions: 45 },
    { month: 'Feb', revenue: 52000000, transactions: 52 },
    { month: 'Mar', revenue: 48000000, transactions: 48 },
    { month: 'Apr', revenue: 61000000, transactions: 61 },
    { month: 'May', revenue: 55000000, transactions: 55 },
    { month: 'Jun', revenue: 72000000, transactions: 72 },
    { month: 'Jul', revenue: 68000000, transactions: 68 },
    { month: 'Aug', revenue: 75000000, transactions: 75 },
    { month: 'Sep', revenue: 82000000, transactions: 82 },
    { month: 'Oct', revenue: 78000000, transactions: 78 },
    { month: 'Nov', revenue: 13200000, transactions: 9 },
    { month: 'Dec', revenue: 0, transactions: 0 }
  ];

  const servicePerformance = [
    { service: 'Ganti LCD', revenue: 95000000, transactions: 95 },
    { service: 'Ganti Baterai', revenue: 45000000, transactions: 90 },
    { service: 'Ganti Kamera', revenue: 35000000, transactions: 35 },
    { service: 'Ganti Speaker', revenue: 20000000, transactions: 40 },
    { service: 'Ganti Port', revenue: 15000000, transactions: 30 }
  ];

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalTransactions = salesData.reduce((sum, item) => sum + item.transactions, 0);
  const averageTransaction = totalRevenue / totalTransactions;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sales Report</h1>
          <p className="text-gray-600">Laporan penjualan dan analisis performa</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Calendar className="w-4 h-4" />
            Periode
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">Rp {totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <span className="text-white text-lg font-bold">₿</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalTransactions}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <span className="text-white text-lg font-bold">↗</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Transaction</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">Rp {averageTransaction.toLocaleString()}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <span className="text-white text-lg font-bold">Ø</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `Rp ${(value / 1000000).toFixed(0)}Jt`}
                />
                <Tooltip 
                  formatter={(value: number) => [`Rp ${value.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#0d9488" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Transactions Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="transactions" stroke="#0d9488" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Service Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transactions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicePerformance.map((service, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{service.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Rp {service.revenue.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{service.transactions}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      Rp {Math.round(service.revenue / service.transactions).toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;