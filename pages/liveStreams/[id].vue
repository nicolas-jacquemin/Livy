<template>
  <VContainer fluid class="mt-5">
    <VRow>
      <VCol cols="12" md="9" class="px-0 px-md-10">
        <Player v-if="liveStream && playSession" autoplay class="v-col-12" @vmReady="updateMediaSession">
          <Hls :poster="liveStream.stream_icon">
            <source :src="`/api/play/manifest/${playSession.id}/index.m3u8`" type="application/x-mpegURL" />
          </Hls>
          <DefaultUi />
        </Player>
        <VCard v-else-if="playError" class="v-col-12 not-available">
          <VCardTitle class="text-center">
            Not available : {{ playError }}
          </VCardTitle>
          <p>Playback will start when the stream is available</p>
        </VCard>
        <VSkeletonLoader v-else class="v-col-12 asp16-9" />

        <VCard elevation="0" v-if="liveStream" class="mt-5 pa-3">
          <VRow>
            <VCol cols="auto">
              <h3>{{ epgNowTitle }}</h3>
            </VCol>
          </VRow>
          <VRow align="center" justify="center" justify-sm="start" class="px-5">
            <VCol cols="auto">
              <VAvatar size="32" class="mx-auto">
                <VImg :src="`/api/live/${liveStream._id}/stream_icon`" />
              </VAvatar>
            </VCol>
            <VCol cols="auto">
              <h4>{{ liveStream.name }}</h4>
            </VCol>
            <VCol cols="auto">
              <VBtn icon @click="toggleLike">
                <VIcon v-if="liveStream.liked">mdi-heart</VIcon>
                <VIcon v-else>mdi-heart-outline</VIcon>
              </VBtn>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import { DefaultUi, Hls, Player } from '@vime/vue-next';
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

const epgNowTitle = computed(() => {
  if (liveStream.value?.epg_now) {
    return liveStream.value.epg_now.title.find((title) => title._value)?._value;
  }
  return liveStream.value?.name;
});

const updateMediaSession = () => {
  console.log('updateMediaSession', liveStream.value)
  if (liveStream.value) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: epgNowTitle.value ?? liveStream.value.name,
      artist: liveStream.value.name,
      artwork: [
        {
          src: `/api/live/${liveStream.value._id}/stream_icon`,
          sizes: `800x800`,
          type: "image/png",
        },
      ],
    });
  }
}

const play = async () => {
  try {
    playError.value = false;
    playSession.value = await useLiveStreams().play(route.params.id as string);
  } catch (error: any) {
    playError.value = true;
    if (error.status == 403) playError.value = "Maximum viewers reached";
    setTimeout(retry, 1000);
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
};

watch(liveStream, () => {
  if (liveStream.value) {
    document.title = `Livy - ${liveStream.value.name}`;
    play();
  }
});

onBeforeUnmount(() => {
  if (playSession.value) {
    usePlay().stop(playSession.value);
  }
});
</script>

<style lang="scss" scoped>
.not-available {
  aspect-ratio: 16/9;
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
