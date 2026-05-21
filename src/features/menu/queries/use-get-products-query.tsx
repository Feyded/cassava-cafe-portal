import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";
import type { GetProductsResponse } from "../types/product";

type GetProductsParams = {
  limit?: number;
  category_id?: number | null;
};

export default function useGetProductsQuery(params: GetProductsParams) {
  return useQuery<GetProductsResponse>({
    queryKey: ["products", params],
    queryFn: async () => {
      const { data } = await api.get("/products", { params });
      return data;
    },
  });
}
