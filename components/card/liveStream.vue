<template>
  <VCard elevation="0" class="pa-0 pa-sm-1" :to="`/liveStreams/${liveStream._id}`">
    <VImg class="image" v-if="liveStream.stream_icon" :src="`/api/live/${liveStream._id}/stream_icon`"/>
    <VRow class="ma-0 mt-2">
      <VCol cols="auto">
        <VAvatar size="32" class="mx-auto">
          <VImg :src="`/api/live/${liveStream._id}/stream_icon`" />
        </VAvatar>
      </VCol>
      <VCol>
        <h4>{{ liveStream.name }}</h4>
      </VCol>
    </VRow>
  </VCard>
</template>

<script lang="ts" setup>
import type {LiveStream} from '~/types/models/LiveStream';

const props = defineProps<{
  liveStream: LiveStream;
}>();

</script>

<style lang="scss" scoped>
.image {
  aspect-ratio: 16/9;
  background: black;
}
</style>