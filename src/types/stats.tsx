export interface SalesData {
  date: string;
  total_revenue: string;
}

export interface DeviceDistribution {
  [key: string]: string | number;
  name: string;
  value: number;
}

export interface RecentActivity {
  id: number;
  id_operator: number;
  status: string;
  metode_pembayaran: string | null;
  jumlah_bayar: number | null;
  kembalian: number | null;
  qris_reference?: string | null;
  total: number;
  created_at: string;
  updated_at: string;
  customer_name: string;
  customer_phone: string;
}

export interface DashboardStats {
  total_services: number;
  total_brands: number;
  total_devices: number;
  total_transactions: number;
  total_users: number;
  total_revenue: string;
  sales_data: SalesData[];
  device_distribution: DeviceDistribution[];
  recent_activities: RecentActivity[];
}

export interface Transaction {
  id: number;
  id_operator: number;
  status: string;
  metode_pembayaran: string | null;
  jumlah_bayar: number | null;
  kembalian: number | null;
  qris_reference: string | null;
  total: number;
  created_at: string;
  updated_at: string;
  customer_name: string;
  customer_phone: string;
}

export interface TransactionReportResponse {
  salesData: {
    month: string;
    revenue: number;
    transactions: number;
  }[];
  servicePerformance: {
    service: string;
    revenue: number;
    transactions: number;
  }[];
  totalRevenue: number;
  totalTransactions: number;
}

