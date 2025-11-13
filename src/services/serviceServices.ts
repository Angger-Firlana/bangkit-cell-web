import axios from "./axios";
import { getCache, setCache, delCacheByPrefix } from "../shared/utils/cache";
import type {Service} from "../types/index";
import type {
  ServicePostRequest,
  ServicePutRequest,
  ServiceDeleteRequest,
  ServiceGetRequest,
  ServicePostResponse,
  ServicePutResponse,
  ServiceDeleteResponse,
  ServiceGetResponse,
} from "../types/services";

// ✅ GET ALL SERVICES (cached by search)
const SERVICE_CACHE_PREFIX = "services:";
const SERVICE_LIST_KEY = (search?: string) =>
  `${SERVICE_CACHE_PREFIX}list:v1:${(search ?? "").trim().toLowerCase()}`;
const SERVICE_BY_ID_KEY = (id: number | string) =>
  `${SERVICE_CACHE_PREFIX}byId:v1:${id}`;
const SERVICE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function getServices(search?: string): Promise<Service[]> {
  const key = SERVICE_LIST_KEY(search);
  const cached = getCache<Service[]>(key);
  if (cached) return cached;
  const params = search ? { search } : {};
  const response = await axios.get<{ success: boolean; data: Service[] }>(
    "/api/services",
    { params }
  );
  const data = response.data.data;
  setCache(key, data, SERVICE_TTL_MS);
  return data;
}

// ✅ GET SERVICE BY ID (cached)
export async function getServiceById(
  id: ServiceGetRequest["id"]
): Promise<ServiceGetResponse> {
  const key = SERVICE_BY_ID_KEY(id);
  const cached = getCache<ServiceGetResponse>(key);
  if (cached) return cached;
  const response = await axios.get<ServiceGetResponse>(`/api/services/${id}`);
  setCache(key, response.data, SERVICE_TTL_MS);
  return response.data;
}

// ✅ CREATE SERVICE
export async function createService(
  data: ServicePostRequest
): Promise<ServicePostResponse> {
  const response = await axios.post<ServicePostResponse>("/api/services", data);
  delCacheByPrefix(SERVICE_CACHE_PREFIX);
  return response.data;
}

// ✅ UPDATE SERVICE
export async function updateService(
  id: number,
  data: ServicePutRequest
): Promise<ServicePutResponse> {
  const response = await axios.put<ServicePutResponse>(`/api/services/${id}`, data);
  delCacheByPrefix(SERVICE_CACHE_PREFIX);
  return response.data;
}

// ✅ DELETE SERVICE
export async function deleteService(
  id: ServiceDeleteRequest["id"]
): Promise<ServiceDeleteResponse> {
  const response = await axios.delete<ServiceDeleteResponse>(`/api/services/${id}`);
  delCacheByPrefix(SERVICE_CACHE_PREFIX);
  return response.data;
}
