<template>
<VCard class="liveStreamCard" elevation="5">
  <VRow align="center" justify="center">
    <VCol>
      <VRow align="center" justify="center">
        <VCol>
          <VImg v-if="liveStream.stream_icon" :src="liveStream.stream_icon" />
        </VCol>
        </VRow>
        <VRow align="center" justify="center">
        <VCol>
          <VCardTitle class="text-center">{{ liveStream.name }}</VCardTitle>
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</VCard>
</template>

<script lang="ts" setup>
import type { LiveStream } from '~/types/models/LiveStream';

const props = defineProps<{
  liveStream: LiveStream;
}>();

</script>

<style lang="scss" scoped>
.liveStreamCard {
  width: 300px;
  height: 300px;
}
</style>