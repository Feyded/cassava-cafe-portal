import { api } from "@/services/api/axios";
import { useMutation } from "@tanstack/react-query";
import type { CreateInventoryCategoryPayload } from "../../types/Category"; // using same payload as name is the only field normally

export default function useUpdateInventoryCategoryMutation() {
  return useMutation({
    mutationKey: ["update-inventory-category"],
    mutationFn: async ({ id, payload }: { id: number; payload: CreateInventoryCategoryPayload }) => {
      const { data } = await api.put(`/inventory-categories/${id}`, payload);
      return data;
    },
  });
}