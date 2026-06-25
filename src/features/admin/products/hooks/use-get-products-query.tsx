import { api } from "@/shared/lib/api";
import { useQuery } from "@tanstack/react-query";

type GetProductsParams = {
  search?: string;
  limit?: number;
  page?: number;
  category_id?: number | null;
};

export default function useGetProductsQuery(params: GetProductsParams) {
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: async () => {
      const { data } = await api.get("/admin/products", {
        params,
      });
      return data;
    },
  });
}
