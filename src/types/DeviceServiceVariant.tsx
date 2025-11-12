import type { Device } from "./devices";
import type { Service } from "./index";

// 🧩 Main Entity
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

  // Relasi
  device: Device;
  service: Service;
}

// 📥 GET
export interface DeviceServiceVariantGetResponse {
  success: boolean;
  data: DeviceServiceVariant[];
}

export interface DeviceServiceVariantShowResponse {
  success: boolean;
  data: DeviceServiceVariant;
}

// ➕ POST
export interface DeviceServiceVariantPostRequest {
  device_id: number;
  service_id: number;
  tipe_part?: string;
  harga_min: number;
  harga_max: number;
  catatan?: string;
}

export interface DeviceServiceVariantPostResponse {
  success: boolean;
  data: DeviceServiceVariant;
}

// ✏️ PUT / UPDATE
export interface DeviceServiceVariantPutRequest {
  id: number;
  device_id: number;
  service_id: number;
  tipe_part?: string;
  harga_min: number;
  harga_max: number;
  catatan?: string;
}

export interface DeviceServiceVariantPutResponse {
  success: boolean;
  data: DeviceServiceVariant;
}

// ❌ DELETE
export interface DeviceServiceVariantDeleteRequest {
  id: number;
}

export interface DeviceServiceVariantDeleteResponse {
  success: boolean;
}
