import { api } from "@/shared/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateVariantDto } from "../types";

export default function useUpdateVariantMutation(productId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-variant", productId],
    mutationFn: async (payload: UpdateVariantDto) => {
      const { data } = await api.patch(
        `/admin/products/${productId}/variants/${payload.id}`,
        {
          name: payload.name,
          price: payload.price,
          is_active: payload.isActive,
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-product-variants"],
      });
    },
  });
}
