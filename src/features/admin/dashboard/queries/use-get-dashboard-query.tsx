import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetDashboardQuery() {
  return useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const { data } = await api.get("/admin/dashboard");
      return data;
    },
  });
}
