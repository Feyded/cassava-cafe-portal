import { api } from "@/shared/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateCheckoutPayload = {
  received_amount: number;
  items: {
    variant_id: number;
    quantity: number;
    modifiers: {
      modifier_id: number;
      quantity: number;
    }[];
  }[];
};

export default function useCreateCheckoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateCheckoutPayload) => {
      const { data } = await api.post("/pos/checkout", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
