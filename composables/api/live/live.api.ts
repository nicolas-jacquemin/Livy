import { ofetch } from "ofetch";
import type { Paginate } from "~/types/Paginate";
import type { PlayResponse } from "~/types/api/PlayResponse";
import type { LiveStream } from "~/types/models/LiveStream";

export const useLiveStreams = () => ({
  index: async (page: number, filter: Map<string, string>, sort: string[]) => {

    const filters = Array.from(filter.entries()).map(([key, value]) => `filter[${key}]=${value}`);

    const config = useRuntimeConfig();
    return await ofetch<Paginate<LiveStream>>(`${config.public.apiUrl}/live?perPage=50&sort=${sort}&page=${page}&${filters.join('&')}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  },

  show: async (id: string) => {
    const config = useRuntimeConfig();
    return await ofetch<LiveStream>(`${config.public.apiUrl}/live/${id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  },

  play: async (id: string) => {
    const config = useRuntimeConfig();
    return await ofetch<PlayResponse>(`${config.public.apiUrl}/live/${id}/play`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  },

  like: async (id: string) => {
    const config = useRuntimeConfig();
    return await ofetch<LiveStream>(`${config.public.apiUrl}/me/livestreams/like/${id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }
    });
  },

  unlike: async (id: string) => {
    const config = useRuntimeConfig();
    return await ofetch<LiveStream>(`${config.public.apiUrl}/me/livestreams/like/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
});
