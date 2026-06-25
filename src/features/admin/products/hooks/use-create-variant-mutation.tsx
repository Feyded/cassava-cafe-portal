import { api } from "@/services/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateVariantPayload = {
  name: string;
  price: number;
  isActive: boolean;
};

export default function useCreateVariantMutation(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-variant", productId],
    mutationFn: async (payload: CreateVariantPayload) => {
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
