import axios from "./axios";
import { getCache, setCache, delCacheByPrefix } from "../shared/utils/cache";
import type {
  Brand,
  BrandPostRequest,
  BrandPostResponse,
  BrandPutRequest,
  BrandPutResponse,
  BrandDeleteRequest,
  BrandDeleteResponse,
} from "../types/brands";

// ✅ Ambil semua brand (cached)
const BRAND_CACHE_PREFIX = "brands:";
const BRAND_LIST_CACHE_KEY = `${BRAND_CACHE_PREFIX}list:v1`;
const BRAND_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const getBrands = async (): Promise<Brand[]> => {
  const cached = getCache<Brand[]>(BRAND_LIST_CACHE_KEY);
  if (cached) return cached;
  const response = await axios.get("/api/brands");
  const data = (response.data.data ?? response.data) as Brand[];
  setCache(BRAND_LIST_CACHE_KEY, data, BRAND_TTL_MS);
  return data;
};

// ✅ Tambah brand baru
export const postBrand = async (
  payload: BrandPostRequest
): Promise<BrandPostResponse> => {
  const response = await axios.post("/api/brands", payload);
  delCacheByPrefix(BRAND_CACHE_PREFIX);
  return response.data;
};

// ✅ Update brand
export const putBrand = async (
  payload: BrandPutRequest
): Promise<BrandPutResponse> => {
  const response = await axios.put(`/api/brands/${payload.id}`, payload);
  delCacheByPrefix(BRAND_CACHE_PREFIX);
  return response.data;
};

// ✅ Hapus brand
export const deleteBrand = async (
  payload: BrandDeleteRequest
): Promise<BrandDeleteResponse> => {
  const response = await axios.delete(`/api/brands/${payload.id}`);
  delCacheByPrefix(BRAND_CACHE_PREFIX);
  return response.data;
};
