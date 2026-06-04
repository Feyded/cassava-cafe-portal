import { api } from "@/services/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateProductPayload } from "../../types/product";

type UpdateProductArgs = {
  id: number;
  payload: CreateProductPayload;
};

export default function useUpdateProductMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: UpdateProductArgs) => {
      const formData = new FormData();

      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("category_id", String(payload.categoryId));
      formData.append("is_available", payload.isAvailable ? "1" : "0");

      if (payload.image) {
        formData.append("image", payload.image);
      }

      const { data } = await api.patch(`/admin/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });
}
