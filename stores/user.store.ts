import { useMe } from "~/composables/api/me/me.api";
import type { User } from "~/types/models/User";

const userStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),
  actions: {
    async fetchUser() {
      const user = await useMe()();
      this.user = user;
    },
  },
  async hydrate(storeState, initialState) {
    const me = useMe();
    storeState.user = await me();
  },
});

export default userStore;
