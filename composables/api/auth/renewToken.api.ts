import { ofetch } from "ofetch";
import type { ApiAuthToken } from "@/types/api/ApiAuthToken";

export const useRenewToken =
  () =>
  async (): Promise<ApiAuthToken> => {
    const config = useRuntimeConfig();
    return await ofetch<ApiAuthToken>(
      `${config.public.apiUrl}/auth/renewToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
  };
