import { api } from "@/shared/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateUserPayload } from "../types/user-payload";

export default function useUpdateUsersMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateUserPayload;
    }) => {
      const { data } = await api.patch(`/admin/users/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
}
