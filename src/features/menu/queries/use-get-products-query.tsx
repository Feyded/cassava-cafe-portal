import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";

type GetProductsParams = {
  limit?: number;
  category_id?: number | null;
};

export default function useGetProductsQuery(params: GetProductsParams) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const { data } = await api.get("/products", { params });
      return data;
    },
  });
}
