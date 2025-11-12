import axios from "./axios";
import type {
  DeviceServiceVariant,
  DeviceServiceVariantPostRequest,
  DeviceServiceVariantPostResponse,
  DeviceServiceVariantPutRequest,
  DeviceServiceVariantPutResponse,
  DeviceServiceVariantDeleteRequest,
  DeviceServiceVariantDeleteResponse,
} from "../types/DeviceServiceVariant";

// ✅ Ambil semua device service variant
export const getDeviceServiceVariants = async (): Promise<DeviceServiceVariant[]> => {
  const response = await axios.get("/api/variants");
  return response.data.data ?? response.data;
};

// ✅ Tambah variant baru
export const postDeviceServiceVariant = async (
  payload: DeviceServiceVariantPostRequest
): Promise<DeviceServiceVariantPostResponse> => {
  const response = await axios.post("/api/variants", payload);
  return response.data;
};

// ✅ Update variant
export const putDeviceServiceVariant = async (
  payload: DeviceServiceVariantPutRequest
): Promise<DeviceServiceVariantPutResponse> => {
  const response = await axios.put(`/api/variants/${payload.id}`, payload);
  return response.data;
};

// ✅ Hapus variant
export const deleteDeviceServiceVariant = async (
  payload: DeviceServiceVariantDeleteRequest
): Promise<DeviceServiceVariantDeleteResponse> => {
  const response = await axios.delete(`/api/variants/${payload.id}`);
  return response.data;
};
