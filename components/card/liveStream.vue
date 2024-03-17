<template>
  <VCard elevation="0" class="pa-0 pa-sm-1" :to="`/liveStreams/${liveStream._id}`">
    <VImg class="image" v-if="largeImage" :src="largeImage"/>
    <div class="progress-bar" :style="`width: ${epgProgress}%`"></div>
    <VRow class="ma-0 mt-2">
      <VCol cols="auto">
        <VAvatar size="32" class="mx-auto">
          <VImg :src="`/api/live/${liveStream._id}/stream_icon`" />
        </VAvatar>
      </VCol>
      <VCol>
        <h4 v-if="epgNowTitle">{{ epgNowTitle }}</h4>
        <p>{{ liveStream.name }}</p>
      </VCol>
    </VRow>
  </VCard>
</template>

<script lang="ts" setup>
import type {LiveStream} from '~/types/models/LiveStream';

const props = defineProps<{
  liveStream: LiveStream;
}>();

const largeImage = computed(() => {
  if (props.liveStream.epg_now) {
    if (props.liveStream.epg_now.image) {
      return props.liveStream.epg_now.image.find((image) => image._value)?._value;
    }
    if (props.liveStream.epg_now.icon) {
      return props.liveStream.epg_now.icon.find((image) => image.src)?.src;
    }
  }
  return `/api/live/${props.liveStream._id}/stream_icon`;
});

const epgNowTitle = computed(() => {
  if (props.liveStream.epg_now) {
    return props.liveStream.epg_now.title.find((title) => title._value)?._value;
  }
  return props.liveStream.name;
});

const epgProgress = computed(() => {
  if (props.liveStream.epg_now && props.liveStream.epg_now.start && props.liveStream.epg_now.stop) {
    const start = new Date(props.liveStream.epg_now.start);
    const end = new Date(props.liveStream.epg_now.stop);
    const now = new Date();
    const duration = end.getTime() - start.getTime();
    const progress = now.getTime() - start.getTime();
    return Math.min(100, Math.max(0, (progress / duration) * 100));
  }
  return 0;
});

</script>

<style lang="scss" scoped>
.image {
  aspect-ratio: 16/9;
  background: black;
}

.progress-bar {
  position: relative;
  background: rgba(208, 29, 29, 0.85);
  height: 5px;
  margin-top: -5px;
  z-index: 2;
}
</style>