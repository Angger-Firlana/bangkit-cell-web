import axios from "./axios";
import type {
  Brand,
  BrandPostRequest,
  BrandPostResponse,
  BrandPutRequest,
  BrandPutResponse,
  BrandDeleteRequest,
  BrandDeleteResponse,
} from "../types/brands";

// ✅ Ambil semua brand
export const getBrands = async (): Promise<Brand[]> => {
  const response = await axios.get("/api/brands");
  return response.data.data ?? response.data;
};

// ✅ Tambah brand baru
export const postBrand = async (
  payload: BrandPostRequest
): Promise<BrandPostResponse> => {
  const response = await axios.post("/api/brands", payload);
  return response.data;
};

// ✅ Update brand
export const putBrand = async (
  payload: BrandPutRequest
): Promise<BrandPutResponse> => {
  const response = await axios.put(`/api/brands/${payload.id}`, payload);
  return response.data;
};

// ✅ Hapus brand
export const deleteBrand = async (
  payload: BrandDeleteRequest
): Promise<BrandDeleteResponse> => {
  const response = await axios.delete(`/api/brands/${payload.id}`);
  return response.data;
};
