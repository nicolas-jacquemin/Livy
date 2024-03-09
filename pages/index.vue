<template>
  <VContainer fluid>
    <h2>Liked LiveStreams</h2>
    <VRow class="mt-7">
      <VCol v-for="liveStream in me.user?.likedLiveStreams" :key="liveStream._id" class="mx-4">
        <CardLiveStream :liveStream="liveStream" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
const me = userStore();

await useAsyncData('user', () => me.fetchUser());
</script>
