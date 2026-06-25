import { api } from "@/shared/lib/axios";
import { useMutation } from "@tanstack/react-query";

export default function useLoginMutation() {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await api.post("/login", payload);
      return data;
    },
  });
}
