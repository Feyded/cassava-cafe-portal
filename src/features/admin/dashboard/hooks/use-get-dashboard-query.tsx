import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export default function useGetDashboardQuery(date: Date) {
  return useQuery({
    queryKey: ["admin-dashboard", date],
    queryFn: async () => {
      const { data } = await api.get("/admin/dashboard", {
        params: {
          date: format(date, "yyyy-MM-dd")
        },
      });
      return data;
    },
  });
}
