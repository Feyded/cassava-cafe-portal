import { api } from "@/services/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateVariantMutation({
  productId,
}: {
  productId: number;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-variant", productId],
    mutationFn: async (payload) => {
      const { data } = await api.post(
        `/admin/products/${productId}/variants`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
}
