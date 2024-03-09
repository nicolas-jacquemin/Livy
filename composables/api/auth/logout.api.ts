import { ofetch } from "ofetch";

export const useLogout =
  () =>
  async (): Promise<void> => {
    const config = useRuntimeConfig();
    return await ofetch<void>(`${config.public.apiUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
