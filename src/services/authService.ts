import api from "./axios.ts";
import type { LoginResponse } from "../types/login.tsx";
import { saveEncrypted } from "../shared/utils/EncryptedLocal.ts";
import { getCache, setCache, delCacheByPrefix } from "../shared/utils/cache";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("api/auth/login", { email, password });
  saveEncrypted("token", response.data.token.toString());
  saveEncrypted("user", JSON.stringify(response.data.data));
  delCacheByPrefix("auth:");
  return response.data;
};

const AUTH_PROFILE_KEY = "auth:profile:v1";
const AUTH_PROFILE_TTL_MS = 2 * 60 * 1000; // 2 minutes

export const getProfile = async () => {
  const cached = getCache<any>(AUTH_PROFILE_KEY);
  if (cached) return cached;
  const response = await api.get("/profile");
  setCache(AUTH_PROFILE_KEY, response.data, AUTH_PROFILE_TTL_MS);
  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const response = await api.post("/api/auth/register", {
    name,
    email,
    password,
    role
  });
  return response.data;
};

export const logout = async () => {
  try {
    await api.post("/api/auth/logout").catch(() => {});
    delCacheByPrefix("auth:");
    
    return true;
  } catch (err) {
    console.error("Logout error:", err);
    return false;
  }
};