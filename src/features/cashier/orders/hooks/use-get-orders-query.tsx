import { api } from "@/shared/lib/api";
import { useQuery } from "@tanstack/react-query";

interface UseGetOrdersQueryParams {
  page: number;
  limit: number;
  search: string | null;
}

export default function useGetOrdersQuery({
  page,
  limit,
  search,
}: UseGetOrdersQueryParams) {
  return useQuery({
    queryKey: ["pos-orders", page, limit, search],
    queryFn: async () => {
      const { data } = await api.get("/pos/orders", {
        params: {
          page,
          limit,
          search,
        },
      });
      return data;
    },
  });
}
