import { api } from "@/services/api/axios";
import { useMutation } from "@tanstack/react-query";
import type { CreateProductPayload } from "../../types/product";

export default function useCreateProductMutation() {
  return useMutation({
    mutationKey: ["create-product"],
    mutationFn: async (payload: CreateProductPayload) => {
      const formData = new FormData();

      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("category_id", String(payload.categoryId));
      formData.append("image", payload.image);

      const { data } = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
  });
}
