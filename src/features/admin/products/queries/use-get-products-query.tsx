import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/models/product";

type GetProductsParams = {
  search?: string;
  limit?: number;
  page?: number;
  category_id?: number | null;
};

export type PaginatedProductsResponse = {
  data: Product[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
};

export default function useGetProductsQuery(params: GetProductsParams) {
  return useQuery({
    queryKey: ["admin-products", params],
    queryFn: async () => {
      const { data } = await api.get<PaginatedProductsResponse>("/admin/products", {
        params,
      });
      return data;
    },
  });
}
