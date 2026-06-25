import { api } from "@/shared/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateVariantDto } from "../types";


export default function useCreateVariantMutation(productId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-variant", productId],
    mutationFn: async (payload: CreateVariantDto) => {
      const { data } = await api.post(`/admin/products/${productId}/variants`, {
        name: payload.name,
        price: payload.price,
        is_active: payload.isActive,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-product-variants"],
      });
    },
  });
}
