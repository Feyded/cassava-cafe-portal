import { api } from "@/services/api/axios";
import { useMutation } from "@tanstack/react-query";
import type { CreateProductPayload } from "../../types/product";

export default function useCreateProductMutation() {
  return useMutation({
    mutationKey: ["create-product"],
    mutationFn: async (payload: CreateProductPayload) => {
      const { data } = await api.post("/products", payload);
      return data;
    },
  });
}
