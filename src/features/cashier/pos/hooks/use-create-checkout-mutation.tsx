import { api } from "@/shared/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCheckoutDto } from "../types";

export default function useCreateCheckoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateCheckoutDto) => {
      const { data } = await api.post("/pos/checkout", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
