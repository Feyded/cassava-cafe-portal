import { api } from "@/shared/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useLogoutMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("auth_token");
      queryClient.clear();
      navigate("/login");
      await api.post("/logout");
    },
  });
}
