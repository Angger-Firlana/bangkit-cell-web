import axios from "./axios";
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

// ✅ GET ALL SERVICES
export async function getServices(search?: string): Promise<Service[]> {
  const params = search ? { search } : {};
  const response = await axios.get<{ success: boolean; data: Service[] }>(
    "/api/services",
    { params }
  );
  return response.data.data;
}

// ✅ GET SERVICE BY ID
export async function getServiceById(
  id: ServiceGetRequest["id"]
): Promise<ServiceGetResponse> {
  const response = await axios.get<ServiceGetResponse>(`/api/services/${id}`);
  return response.data;
}

// ✅ CREATE SERVICE
export async function createService(
  data: ServicePostRequest
): Promise<ServicePostResponse> {
  const response = await axios.post<ServicePostResponse>("/api/services", data);
  return response.data;
}

// ✅ UPDATE SERVICE
export async function updateService(
  id: number,
  data: ServicePutRequest
): Promise<ServicePutResponse> {
  const response = await axios.put<ServicePutResponse>(`/api/services/${id}`, data);
  return response.data;
}

// ✅ DELETE SERVICE
export async function deleteService(
  id: ServiceDeleteRequest["id"]
): Promise<ServiceDeleteResponse> {
  const response = await axios.delete<ServiceDeleteResponse>(`/api/services/${id}`);
  return response.data;
}
