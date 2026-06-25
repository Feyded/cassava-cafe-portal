import { envConfig } from "@/env";

export function formatFileUrl(filePath: string): string {
  return envConfig.VITE_API_BASE_URL.split("/api")[0] + "/storage/" + filePath;
}
