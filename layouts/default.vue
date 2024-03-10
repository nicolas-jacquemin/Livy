<template>
  <VContainer fluid>
    <VAppBar>
      <VAppBarNavIcon @click="drawer = !drawer" />
      <VAppBarTitle>Livy</VAppBarTitle>
      <VSpacer />
      <VBtn @click="logout()" variant="text">Logout</VBtn>
    </VAppBar>
  </VContainer>

  <VNavigationDrawer v-model="drawer" temporary>
    <VList>
      <VListItem to="/">Home</VListItem>
      <VListItem to="/liveStreams">Live Streams</VListItem>
    </VList>
  </VNavigationDrawer>

  <slot />
</template>

<script lang="ts" setup>
import { useLogout } from '~/composables/api/auth/logout.api';

const logoutApi = useLogout();

const drawer = ref(false);

const logout = async () => {
  await logoutApi();
  window.location.reload();
};
</script>
