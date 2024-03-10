import { ofetch } from "ofetch";
import type { ApiAuthToken } from "@/types/api/ApiAuthToken";

export const useSSRRenewToken =
  () =>
  async () => {
    
    const config = useRuntimeConfig();

    const clientToken = useCookie("userToken");

    return await ofetch<ApiAuthToken>(`${config.public.apiFullUrl}/auth/renewToken`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": `userToken=${clientToken.value}`,
      },
    });
  };
