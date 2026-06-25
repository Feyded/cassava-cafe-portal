import { api } from "@/shared/lib/axios";
import { useQuery } from "@tanstack/react-query";

type GetOrdersParams = {
  limit?: number;
  page?: number;
  status?: string;
  search?: string;
};

export default function useGetOrdersQuery(params: GetOrdersParams) {
  return useQuery({
    queryKey: ["admin-orders", params],
    queryFn: async () => {
      const { data } = await api.get("/admin/orders", {
        params,
      });
      return data;
    },
  });
}
