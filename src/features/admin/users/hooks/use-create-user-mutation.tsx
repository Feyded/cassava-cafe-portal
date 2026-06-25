import { api } from "@/shared/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserDto } from "../types";

export function useCreateUserQuery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateUserDto) => {
      const { data } = await api.post("/admin/users", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
}
