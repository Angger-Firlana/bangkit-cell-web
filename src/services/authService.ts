import api from "./axios.ts";
import type { LoginResponse } from "../types/login.tsx";
import { saveEncrypted } from "../shared/utils/EncryptedLocal.ts";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("api/auth/login", { email, password });
  saveEncrypted("token", response.data.token.toString());
  saveEncrypted("user", JSON.stringify(response.data.data));
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};