import { api } from "@/services/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateVariantPayload = {
  name: string;
  price: number;
  isActive: boolean;
  id: string;
};

export default function useUpdateVariantMutation(productId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-variant", productId],
    mutationFn: async (payload: UpdateVariantPayload) => {
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
