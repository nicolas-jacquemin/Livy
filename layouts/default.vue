<template>
  <div>
    <VAppBar>
      <!-- <VAppBarNavIcon @click="drawer = !drawer" /> -->
      <VBtn icon to="/">
        <VIcon>mdi-home</VIcon>
      </VBtn>
      <VAppBarTitle>Livy</VAppBarTitle>
      <VSpacer />
      <h4>{{ user.user?.name }}</h4>
      <VBtn class="ml-5" @click="logout()" icon>
        <VIcon>mdi-logout</VIcon>
      </VBtn>
    </VAppBar>
  
    <VNavigationDrawer v-model="drawer" temporary>
      <VList>
        <VListItem to="/">Home</VListItem>
        <VListItem to="/liveStreams">Live Streams</VListItem>
      </VList>
    </VNavigationDrawer>
  
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useLogout } from "~/composables/api/auth/logout.api";

const logoutApi = useLogout();

const user = userStore();

const drawer = ref(false);

const logout = async () => {
  await logoutApi();
  window.location.reload();
};
</script>
