import { ofetch } from "ofetch";
import type { User } from "~/types/models/User";

export const useMe =
  () =>
  async (): Promise<User> => {
    const config = useRuntimeConfig();
    return await ofetch<User>(`${config.public.apiUrl}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
