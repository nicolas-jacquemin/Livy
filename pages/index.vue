<template>
  <div>
    <VContainer fluid class="mt-5">
      <h2>Welcome back {{ me.user?.name }} !</h2>
      <VCard class="mt-5 pa-5" v-if="sessions.length > 0">
        <VRow>
          <VCol
            v-for="session in sessions"
            :key="session.liveStream._id"
            class="mx-4"
            cols="auto"
          >
            <VBtn :to="`/liveStreams/${session.liveStream._id}`"><h4>{{ session.users.map((user) => user.name).join(", ") }} {{ session.users.length > 1 ? 'are' : 'is' }} watching to {{ session.liveStream.name }}</h4></VBtn>
          </VCol>
        </VRow>
      </VCard>
      <div class="liked" v-if="me.user?.likedLiveStreams.length">
        <h2 class="mt-10">Favorite livestream</h2>
        <VRow class="mt-7">
          <VCol
            v-for="liveStream in me.user?.likedLiveStreams"
            :key="liveStream._id"
            cols="12" sm="6" md="4" lg="3" xl="2"
            class="px-0 px-sm-1 flex-grow-1"
          >
            <CardLiveStream
              class="pointer"
              :liveStream="liveStream"
              v-ripple
              :to="`/liveStreams/${liveStream._id}`"
            />
          </VCol>
        </VRow>
      </div>
      <div class="search">
        <h2 class="mt-10">Livestreams</h2>
        <CardLiveStreamSearcher />
      </div>
    </VContainer>
  </div>
</template>

<script lang="ts" setup>
import type { SessionResponse } from '~/types/api/SessionResponse';
import { useSession } from '~/composables/api/session/session.api.js';

const me = userStore();

const sessionApi = useSession();

const sessions = ref<SessionResponse[]>([]);

let interval: NodeJS.Timeout;

const fetchSessions = async () => {
  sessions.value = await sessionApi.index();
};

await useAsyncData("user", () => me.fetchUser());

onMounted(() => {
  if (interval)
    clearInterval(interval);
  interval = setInterval(() => {
    fetchSessions();
  }, 5000);
  fetchSessions();
});

onBeforeUnmount(() => {
  if (interval)
    clearInterval(interval);
});
</script>

<style scoped lang="scss">
.pointer {
  cursor: pointer;
}
</style>
