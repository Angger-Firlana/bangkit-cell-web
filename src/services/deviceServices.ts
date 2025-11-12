import axios from "./axios";
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

// ✅ Ambil semua device
export const getDevices = async (): Promise<Device[]> => {
  const response = await axios.get<DeviceGetResponse>("/api/devices");
  return response.data.data ?? [];
};

// ✅ Tambah device baru
export const postDevice = async (
  payload: DevicePostRequest
): Promise<DevicePostResopnse> => {
  const response = await axios.post<DevicePostResopnse>("/api/devices", payload);
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
  return response.data;
};

// ✅ Hapus device
export const deleteDevice = async (
  payload: DeviceDeleteRequest
): Promise<DeviceDeleteResponse> => {
  const response = await axios.delete<DeviceDeleteResponse>(
    `/api/devices/${payload.id}`
  );
  return response.data;
};
