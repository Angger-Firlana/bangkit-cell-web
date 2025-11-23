import { useQuery } from "@tanstack/react-query";
import { api } from "./axios";

export const fetchTransactionReport = async () => {
  const response = await api.get("/api/stats/report");
  return response.data.data ?? response.data;
};

export const useTransactionReport = () => {
  return useQuery({
    queryKey: ["transaction-report"],
    queryFn: fetchTransactionReport,
    staleTime: 1000 * 60 * 5, // cache 5 menit
    refetchOnWindowFocus: true, // refetch saat pindah tab balik lagi
    refetchInterval: 1000 * 60, // update otomatis tiap 1 menit
  });
};
