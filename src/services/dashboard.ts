import axios from "./axios";
import type { DashboardStats } from "../types/stats";
import { getCache, setCache } from "../shared/utils/cache";

const DASHBOARD_STATS_CACHE_KEY = "dashboard:stats:v1";
const DASHBOARD_STATS_TTL_MS = 5 * 60 * 1000; // 5 minutes

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const cached = getCache<DashboardStats>(DASHBOARD_STATS_CACHE_KEY);
  if (cached) return cached;

  const response = await axios.get("/api/stats");
  const data: DashboardStats = response.data.data ?? response.data;
  setCache(DASHBOARD_STATS_CACHE_KEY, data, DASHBOARD_STATS_TTL_MS);
  return data;
};
