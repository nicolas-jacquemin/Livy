import { ofetch } from "ofetch";
import type { PlayResponse } from "~/types/api/PlayResponse";

export const usePlay = () => ({
  stop: async (play: PlayResponse) => {
    const config = useRuntimeConfig();
    return await ofetch<void>(`${config.public.apiUrl}/play/stop/${play.id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  },
});
