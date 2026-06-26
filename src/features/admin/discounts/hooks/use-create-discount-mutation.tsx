import { api } from "@/shared/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateDiscountDto } from "../types";

export function useCreateDiscountQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateDiscountDto) => {
      const { data } = await api.post("/admin/discounts", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-discounts"] });
    },
  });
}
