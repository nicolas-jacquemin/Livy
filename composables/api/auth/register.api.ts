import { ofetch } from "ofetch";
import type { ApiAuthToken } from "@/types/api/ApiAuthToken";

export const useRegister =
  () =>
  async (
    name: string,
    email: string,
    password: string,
    inviteCode: string
  ): Promise<ApiAuthToken> => {
    const config = useRuntimeConfig();
    return await ofetch<ApiAuthToken>(`${config.public.apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, inviteCode }),
    });
  };
