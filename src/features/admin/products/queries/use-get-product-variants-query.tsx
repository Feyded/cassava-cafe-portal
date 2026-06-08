import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";

type GetProductsParams = {
  limit: number;
  page: number;
  productId: number;
};

export default function useGetProductVariantsQuery({
  productId,
  limit,
  page,
}: GetProductsParams) {
  return useQuery({
    queryKey: ["admin-product-variants", productId, limit, page],
    queryFn: async () => {
      const { data } = await api.get(`/admin/products/${productId}/variants`, {
        params: { limit, page },
      });
      return data;
    },
  });
}
