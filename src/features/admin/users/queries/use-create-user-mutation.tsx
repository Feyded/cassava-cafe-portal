import { api } from "@/services/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserPayload } from "../types/user-payload";

export default function useCreateUsersQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateUserPayload) => {
      const { data } = await api.post("/admin/users", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
}
