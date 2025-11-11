export interface Brand {
  id: number;
  nama: string;
  negara_asal: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Device {
  id: number;
  brand_id: number;
  model: string;
  tipe: string | null;
  created_at: string | null;
  updated_at: string | null;
  brand?: Brand;
}

export interface Service {
  id: number;
  nama: string;
  deskripsi: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface DeviceServiceVariant {
  id: number;
  device_id: number;
  service_id: number;
  tipe_part: string | null;
  harga_min: number;
  harga_max: number;
  catatan: string | null;
  created_at: string | null;
  updated_at: string | null;
  device?: Device;
  service?: Service;
}

export interface Transaction {
  id: number;
  id_operator: number;
  status: 'pending' | 'paid' | 'cancelled';
  metode_pembayaran: 'cash' | 'qris' | 'gopay' | 'other' | null;
  jumlah_bayar: number | null;
  kembalian: number | null;
  qris_reference: string | null;
  total: number;
  created_at: string | null;
  updated_at: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  operator?: User;
  details?: TransactionDetail[];
}

export interface TransactionDetail {
  id: number;
  transaction_id: number;
  device_service_variant_id: number;
  harga: number;
  harga_modal: number | null;
  created_at: string | null;
  updated_at: string | null;
  device_service_variant?: DeviceServiceVariant;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'operator';
  created_at: string | null;
  updated_at: string | null;
}

export interface PriceLog {
  id: number;
  device_service_variant_id: number;
  user_id: number | null;
  old_harga_min: number | null;
  old_harga_max: number | null;
  new_harga_min: number | null;
  new_harga_max: number | null;
  tipe_part: string | null;
  changed_at: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
}

export interface DashboardStats {
  totalServices: number;
  totalDevices: number;
  totalRevenue: number;
  activeTransactions: number;
  totalBrands: number;
  totalUsers: number;
}