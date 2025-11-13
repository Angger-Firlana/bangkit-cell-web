import axios from "./axios";
import { getCache, setCache, delCacheByPrefix } from "../shared/utils/cache";
import type {
  DeviceServiceVariant,
  DeviceServiceVariantPostRequest,
  DeviceServiceVariantPostResponse,
  DeviceServiceVariantPutRequest,
  DeviceServiceVariantPutResponse,
  DeviceServiceVariantDeleteRequest,
  DeviceServiceVariantDeleteResponse,
} from "../types/DeviceServiceVariant";

// ✅ Ambil semua device service variant (cached)
const VARIANT_CACHE_PREFIX = "variants:";
const VARIANT_LIST_KEY = `${VARIANT_CACHE_PREFIX}list:v1`;
const VARIANT_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const getDeviceServiceVariants = async (): Promise<DeviceServiceVariant[]> => {
  const cached = getCache<DeviceServiceVariant[]>(VARIANT_LIST_KEY);
  if (cached) return cached;
  const response = await axios.get("/api/variants");
  const data = (response.data.data ?? response.data) as DeviceServiceVariant[];
  setCache(VARIANT_LIST_KEY, data, VARIANT_TTL_MS);
  return data;
};

// ✅ Tambah variant baru
export const postDeviceServiceVariant = async (
  payload: DeviceServiceVariantPostRequest
): Promise<DeviceServiceVariantPostResponse> => {
  const response = await axios.post("/api/variants", payload);
  delCacheByPrefix(VARIANT_CACHE_PREFIX);
  return response.data;
};

// ✅ Update variant
export const putDeviceServiceVariant = async (
  payload: DeviceServiceVariantPutRequest
): Promise<DeviceServiceVariantPutResponse> => {
  const response = await axios.put(`/api/variants/${payload.id}`, payload);
  delCacheByPrefix(VARIANT_CACHE_PREFIX);
  return response.data;
};

// ✅ Hapus variant
export const deleteDeviceServiceVariant = async (
  payload: DeviceServiceVariantDeleteRequest
): Promise<DeviceServiceVariantDeleteResponse> => {
  const response = await axios.delete(`/api/variants/${payload.id}`);
  delCacheByPrefix(VARIANT_CACHE_PREFIX);
  return response.data;
};
