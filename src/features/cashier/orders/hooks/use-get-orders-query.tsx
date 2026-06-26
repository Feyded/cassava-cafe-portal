import { api } from "@/shared/lib/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

interface UseGetOrdersQueryParams {
  page: number;
  limit: number;
  search: string | null;
  date: Date;
}

export default function useGetOrdersQuery({
  page,
  limit,
  search,
  date
}: UseGetOrdersQueryParams) {
  return useQuery({
    queryKey: ["pos-orders", page, limit, search, date],
    queryFn: async () => {
      const { data } = await api.get("/pos/orders", {
        params: {
          page,
          limit,
          search,
          date: format(date, "yyyy-MM-dd"),
        },
      });
      return data;
    },
  });
}
