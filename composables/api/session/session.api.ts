import { ofetch } from "ofetch";
import type { SessionResponse } from "~/types/api/SessionResponse";

export const useSession = () => ({
  index: async () => {
    const config = useRuntimeConfig();
    return await ofetch<SessionResponse[]>(`${config.public.apiUrl}/session`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  },
});
