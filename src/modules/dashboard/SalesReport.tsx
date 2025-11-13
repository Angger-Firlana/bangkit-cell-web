import React, { useEffect, useState } from "react";
import { Download, Filter, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { fetchTransactionReport } from "../../services/transactionReportServices";
import type { TransactionReportResponse } from "../../types/stats";

const CACHE_KEY = "sales_report_cache";
const CACHE_DURATION = 60 * 60 * 1000; // 1 jam

const SalesReport: React.FC = () => {
  const [data, setData] = useState<TransactionReportResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Ambil dari cache atau API
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_DURATION) {
        setData(parsed.data);
        setLoading(false);
        return;
      }
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchTransactionReport();
      setData(response);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: response, timestamp: Date.now() })
      );
    } catch (err: any) {
      setError("Gagal memuat laporan penjualan.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-500">Memuat data laporan...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );

  if (!data) return null;

  const { salesData, servicePerformance, totalRevenue, totalTransactions } =
    data;

  const averageTransaction =
    totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  return (
    <div className="p-6">
      {/* Header */}
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
        <SummaryCard
          title="Total Revenue"
          value={`Rp ${totalRevenue.toLocaleString()}`}
          color="bg-green-500"
          symbol="₿"
        />
        <SummaryCard
          title="Total Transactions"
          value={totalTransactions}
          color="bg-blue-500"
          symbol="↗"
        />
        <SummaryCard
          title="Avg. Transaction"
          value={`Rp ${averageTransaction.toLocaleString()}`}
          color="bg-purple-500"
          symbol="Ø"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Monthly Revenue">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `Rp ${(value / 1000000).toFixed(0)}Jt`}
              />
              <Tooltip
                formatter={(value: number) => [`Rp ${value.toLocaleString()}`, "Revenue"]}
              />
              <Bar dataKey="revenue" fill="#0d9488" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Transactions Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="transactions"
                stroke="#0d9488"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Service Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Service Performance
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Service", "Revenue", "Transactions", "Avg. Revenue"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {servicePerformance.map((s, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {s.service}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Rp {s.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {s.transactions}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    Rp{" "}
                    {Math.round(s.revenue / s.transactions).toLocaleString()}
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

const SummaryCard = ({
  title,
  value,
  color,
  symbol,
}: {
  title: string;
  value: string | number;
  color: string;
  symbol: string;
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`${color} p-3 rounded-lg`}>
        <span className="text-white text-lg font-bold">{symbol}</span>
      </div>
    </div>
  </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="h-80">{children}</div>
  </div>
);

export default SalesReport;
