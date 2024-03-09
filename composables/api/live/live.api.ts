import { ofetch } from "ofetch";
import type { Paginate } from "~/types/Paginate";
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
});
