import axios from "./axios";
import { getCache, setCache, delCacheByPrefix } from "../shared/utils/cache";
import type {
  User,
  UserPostRequest,
  UserPostResponse,
  UserPutRequest,
  UserPutResponse,
  UserDeleteRequest,
  UserDeleteResponse,
} from "../types/users";

// Cache Key
const USER_CACHE_PREFIX = "users:";
const USER_LIST_CACHE_KEY = `${USER_CACHE_PREFIX}list:v1`;
const USER_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const getUsers = async (): Promise<User[]> => {
  const cached = getCache<User[]>(USER_LIST_CACHE_KEY);
  if (cached) return cached;

  const response = await axios.get("/api/users/");
  const data = (response.data.data ?? response.data) as User[];

  setCache(USER_LIST_CACHE_KEY, data, USER_TTL_MS);
  return data;
};

export const postUser = async (
  payload: UserPostRequest
): Promise<UserPostResponse> => {
  const response = await axios.post("/api/users/", payload);
  delCacheByPrefix(USER_CACHE_PREFIX);
  return response.data;
};

export const putUser = async (
  payload: UserPutRequest
): Promise<UserPutResponse> => {
  const response = await axios.put(`/api/users/${payload.id}`, payload);
  delCacheByPrefix(USER_CACHE_PREFIX);
  return response.data;
};

export const deleteUser = async (
  payload: UserDeleteRequest
): Promise<UserDeleteResponse> => {
  const response = await axios.delete(`/api/users/${payload.id}`);
  delCacheByPrefix(USER_CACHE_PREFIX);
  return response.data;
};
