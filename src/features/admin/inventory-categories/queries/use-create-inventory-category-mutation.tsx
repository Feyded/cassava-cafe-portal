import { api } from "@/services/api/axios";
import { useMutation } from "@tanstack/react-query";
import type { CreateInventoryCategoryPayload } from "../../types/Category";

export default function useCreateInventoryCategoryMutation() {
  return useMutation({
    mutationKey: ["create-inventory-category"],
    mutationFn: async (payload: CreateInventoryCategoryPayload) => {
      const { data } = await api.post("/inventory-categories", payload);
      return data;
    },
  });
}
