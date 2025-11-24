import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Smartphone,
  Wrench,
  DollarSign,
  Package,
  Building,
} from "lucide-react";
import type { DashboardStats } from "../../types/stats";
import { getDashboardStats } from "../../services/dashboard";
import dayjs from "dayjs";

// Warna berbeda untuk setiap brand
const BRAND_COLORS: { [key: string]: string } = {
  'Xiaomi': '#FFA447',
  'Apple': '#4ECDC4',
  'Samsung': '#A78BFA',
  'Oppo': '#FFE66D',
  'Vivo': '#95E1D3',
  'Realme': '#F38181',
  'Infinix': '#AA96DA',
  'Tecno': '#FF6BCB',
  'Nokia': '#67C5E6',
  'Asus': '#FF6B6B',
};

// Fungsi untuk generate warna random jika brand belum ada di mapping
const getColorForBrand = (brandName: string, index: number): string => {
  if (BRAND_COLORS[brandName]) {
    return BRAND_COLORS[brandName];
  }
  // Generate warna berdasarkan index jika brand tidak ada
  const hue = (index * 137.508) % 360; // Golden angle approximation
  return `hsl(${hue}, 70%, 60%)`;
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardStats | null>(null);

  useEffect(() => {
    getDashboardStats().then(setData).catch(console.error);
  }, []);

  if (!data)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading dashboard...
      </div>
    );

  const cards = [
    {
      title: "Total Services",
      value: data.total_services,
      icon: Wrench,
      color: "bg-blue-500",
      description: "Jenis layanan tersedia",
    },
    {
      title: "Total Devices",
      value: data.total_devices,
      icon: Smartphone,
      color: "bg-green-500",
      description: "Model perangkat",
    },
    {
      title: "Total Brands",
      value: data.total_brands,
      icon: Building,
      color: "bg-purple-500",
      description: "Merek terdaftar",
    },
    {
      title: "Total Users",
      value: data.total_users,
      icon: Users,
      color: "bg-orange-500",
      description: "Admin & Operator",
    },
    {
      title: "Total Transactions",
      value: data.total_transactions,
      icon: Package,
      color: "bg-red-500",
      description: "Transaksi aktif",
    },
    {
      title: "Total Revenue",
      value: `Rp ${Number(data.total_revenue).toLocaleString("id-ID")}`,
      icon: DollarSign,
      color: "bg-teal-500",
      description: "Pendapatan total",
    },
  ];

  return (
    <div
      className="flex h-screen bg-gray-50"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {/* === CARDS === */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {card.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {card.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {card.description}
                      </p>
                    </div>
                    <div className={`${card.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* === CHARTS === */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Bar Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Revenue by Date
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.sales_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d) => dayjs(d).format("DD MMM")}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [
                        `Rp ${Number(value).toLocaleString("id-ID")}`,
                        "Revenue",
                      ]}
                    />
                    <Bar dataKey="total_revenue" fill="#0d9488" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Device Distribution Pie Chart - FIXED */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Device Distribution
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data.device_distribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={50}
                      label={({ name, percent }) =>
                        `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : '0'}%`
                      }
                      dataKey="value"
                    >
                      {data.device_distribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getColorForBrand(entry.name, index)}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* === RECENT ACTIVITIES === */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activities
            </h3>
            <div className="space-y-4">
              {data.recent_activities.slice(0, 6).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    ></div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {activity.customer_name || "Tanpa Nama"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {dayjs(activity.created_at).format(
                          "DD MMM YYYY, HH:mm"
                        )}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activity.status === "success"
                      ? "Selesai"
                      : "Dalam Proses"}
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