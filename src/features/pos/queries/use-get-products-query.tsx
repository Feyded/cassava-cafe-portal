import { api } from "@/shared/lib/axios";
import { useQuery } from "@tanstack/react-query";

type GetProductsParams = {
  page: number;
  limit: number;
  categoryId?: number | null;
};

export default function useGetProductsQuery(params: GetProductsParams) {
  return useQuery({
    queryKey: ["pos-products", params],
    queryFn: async () => {
      const { data } = await api.get("/pos/products", {
        params: { ...params, category_id: params.categoryId },
      });
      return data;
    },
  });
}
