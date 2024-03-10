<template>
  <VContainer fluid>
    <VRow class="mt-10" align="center" justify="center">
      <VCol cols="12" sm="10" md="7" lg="5" xl="4">
        <VForm @submit.prevent="searchLiveStreams">
          <VTextField
            v-model="search"
            label="Search"
            outlined
            dense
            class="mx-2"
            placeholder="Search"
            @input="searchLiveStreamsDebounced"
          />
        </VForm>
      </VCol>
    </VRow>
    <VRow class="mt-7" align="start">
      <VCol
        v-for="liveStream in liveStreams?.data"
        :key="liveStream._id"
        class="mx-2"
      >
        <CardLiveStream class="pointer" :liveStream="liveStream" v-ripple :to="`/liveStreams/${liveStream._id}`" />
      </VCol>
    </VRow>
    <h4 v-if="liveStreams?.data?.length === 0" class="text-center">
      No live streams found
    </h4>
    <VRow v-if="loading" align="center" justify="center">
      <VCol class="py-15">
        <VProgressLinear indeterminate size="64" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script lang="ts" setup>
import { useLiveStreams } from "~/composables/api/live/live.api";
import type { Paginate } from "~/types/Paginate";
import type { LiveStream } from "~/types/models/LiveStream";

const debounce = useDebounce().debounce;

const page = ref(1);
const search = ref("");
const loading = ref(false);

const filters = computed(() => {
  const filters = new Map<string, string>();
  if (search.value) {
    filters.set("search", search.value);
  }

  return filters;
});

const { data: liveStreams } = useAsyncData(
  "liveStreams",
  () => useLiveStreams().index(page.value, filters.value, []),
  {
    server: false,
  }
);

const searchLiveStreams = async () => {
  page.value = 1;
  liveStreams.value = await useLiveStreams().index(
    page.value,
    filters.value,
    []
  );
};

const searchLiveStreamsDebounced = debounce(searchLiveStreams, 300);

const onScroll = async () => {
  const bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight >=
    document.documentElement.offsetHeight - 400;
  if (bottomOfWindow && (liveStreams.value?.pages && liveStreams.value?.pages > page.value)) {
    page.value++;
    loading.value = true;
    const newLiveStreams = await useLiveStreams().index(
      page.value,
      filters.value,
      []
    );
    liveStreams.value = {
      ...(liveStreams.value as Paginate<LiveStream>),
      data: [...(liveStreams.value?.data || []), ...newLiveStreams.data],
    };
    loading.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped lang="scss">
.pointer {
  cursor: pointer;
}
</style>