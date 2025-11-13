import axios from "./axios";
import { getCache, setCache, delCacheByPrefix } from "../shared/utils/cache";
import type {
  Device,
  DeviceGetResponse,
  DevicePostRequest,
  DevicePostResopnse,
  DevicePustRequest,
  DevicePustResopnse,
  DeviceDeleteRequest,
  DeviceDeleteResponse,
} from "../types/devices";

// ✅ Ambil semua device (cached)
const DEVICE_CACHE_PREFIX = "devices:";
const DEVICE_LIST_KEY = `${DEVICE_CACHE_PREFIX}list:v1`;
const DEVICE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const getDevices = async (): Promise<Device[]> => {
  const cached = getCache<Device[]>(DEVICE_LIST_KEY);
  if (cached) return cached;
  const response = await axios.get<DeviceGetResponse>("/api/devices");
  const data = response.data.data ?? [];
  setCache(DEVICE_LIST_KEY, data, DEVICE_TTL_MS);
  return data;
};

// ✅ Tambah device baru
export const postDevice = async (
  payload: DevicePostRequest
): Promise<DevicePostResopnse> => {
  const response = await axios.post<DevicePostResopnse>("/api/devices", payload);
  delCacheByPrefix(DEVICE_CACHE_PREFIX);
  return response.data;
};

// ✅ Update device
export const putDevice = async (
  payload: DevicePustRequest
): Promise<DevicePustResopnse> => {
  const response = await axios.put<DevicePustResopnse>(
    `/api/devices/${payload.id}`,
    payload
  );
  delCacheByPrefix(DEVICE_CACHE_PREFIX);
  return response.data;
};

// ✅ Hapus device
export const deleteDevice = async (
  payload: DeviceDeleteRequest
): Promise<DeviceDeleteResponse> => {
  const response = await axios.delete<DeviceDeleteResponse>(
    `/api/devices/${payload.id}`
  );
  delCacheByPrefix(DEVICE_CACHE_PREFIX);
  return response.data;
};
