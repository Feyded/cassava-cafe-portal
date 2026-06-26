import { api } from "@/shared/lib/api";
import { useQuery } from "@tanstack/react-query";

type GetDiscountsParams = {
  page: number;
  limit: number;
  search?: string;
};

export default function useGetDiscountsQuery(params: GetDiscountsParams) {
  return useQuery({
    queryKey: ["admin-discounts", params],
    queryFn: async () => {
      const { data } = await api.get("/admin/discounts", {
        params,
      });
      return data;
    },
  });
}