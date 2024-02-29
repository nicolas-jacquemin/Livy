import { ofetch } from "ofetch";
import type { ApiAuthToken } from "@/types/api/ApiAuthToken";

export const useLogin =
  () =>
  async (email: string, password: string): Promise<ApiAuthToken> => {
    const config = useRuntimeConfig();
    return await ofetch<ApiAuthToken>(`${config.public.apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };
