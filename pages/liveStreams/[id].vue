<template>
  <div>
    <VRow>
      <VCol cols="12" lg="7" class="px-10">
        <VideoPlayer
          v-if="playSession"
          :src="`/api/play/manifest/${playSession.id}/index.m3u8`"
          poster="`/api/live/${liveStream._id}/stream_icon`"
          controls
          :loop="true"
          :volume="0.6"
          class="v-col-12"
          aspect-ratio="16:9"
          autoplay
        />
        <VCard v-else-if="playError" class="v-col-12 not-available">
          <VCardTitle class="text-center"
            >Not available : {{ playError }}</VCardTitle
          >
          <VBtn @click="play" color="primary">Retry</VBtn>
        </VCard>
        <VSkeletonLoader v-else class="v-col-12 asp16-9" />

        <VCard v-if="liveStream" class="mt-5 pa-3">
          <VRow>
            <VCol cols="auto">
              <VCardTitle>{{ liveStream.name }}</VCardTitle>
            </VCol>
            <VCol>
              <VBtn icon @click="toggleLike">
                <VIcon v-if="liveStream.liked">mdi-heart</VIcon>
                <VIcon v-else>mdi-heart-outline</VIcon>
              </VBtn>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script lang="ts" setup>
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";
import { useLiveStreams } from "~/composables/api/live/live.api";
import { usePlay } from "~/composables/api/play/stop.api";
import type { PlayResponse } from "~/types/api/PlayResponse";

const route = useRoute();

const { data: liveStream } = useAsyncData(
  "liveStream",
  () => useLiveStreams().show(route.params.id as string),
  {
    server: false,
  }
);

const playSession = ref<PlayResponse | null>(null);
const playError = ref<boolean | string>(false);

let retryInterval: NodeJS.Timeout | null = null;

const play = async () => {
  try {
    playSession.value = await useLiveStreams().play(route.params.id as string);
    playError.value = false;
  } catch (error: any) {
    playError.value = true;
    if (error.status == 403) playError.value = "Maximum viewers reached";
  }
};

const retry = () => {
  if (playError.value) {
    play();
  }
};

const toggleLike = async () => {
  if (liveStream.value) {
    if (liveStream.value.liked) {
      await useLiveStreams().unlike(liveStream.value._id);
    } else {
      await useLiveStreams().like(liveStream.value._id);
    }
    liveStream.value.liked = !liveStream.value.liked;
  }
}

watchEffect(() => {
  if (liveStream.value) {
    document.title = `Livy - ${liveStream.value.name}`;
    if (retryInterval) clearInterval(retryInterval);
    play();
    retryInterval = setInterval(retry, 1000);
  }
});

onBeforeUnmount(() => {
  if (retryInterval) clearInterval(retryInterval);
  if (playSession.value) {
    usePlay().stop(playSession.value);
  }
});
</script>

<style lang="scss" scoped>
.not-available {
  aspect-ratio: 16/9;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.asp16-9 {
  aspect-ratio: 16/9;
}
</style>
