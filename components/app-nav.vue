<template>
  <app-bar></app-bar>
  <v-navigation-drawer
    expand-on-hover
    rail
    width="300"
    class="pt-4 pr-2"
    color="grey">
    <app-bar-search></app-bar-search>
    <v-list class="navList" nav density="compact" mandatory v-model="navPage">
      <v-list-item v-for="(item, i) in navItems" :key="i" :value="item">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>

      <div class="navSpacer">
        <v-divider></v-divider>

        <v-list-item
          :prepend-avatar="userParam.avatar"
          :title="userParam.dispName"
          :subtitle="userParam.email"
          class="mt-2"
        ></v-list-item>

        <v-list-item
          v-for="(item, i) in navParamItems"
          :key="i"
          :value="item"
          :color="item.color"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      navItems: [{ text: "Home", icon: "mdi-home", link: "/" }],
      userParam: {
        dispName: "Sandra Adams",
        avatar: "https://randomuser.me/api/portraits/women/85.jpg",
        email: "sandra_a88@gmail.com",
      },
      navParamItems: [
        { text: "Settings", icon: "mdi-cog", link: "/settings" },
        { text: "Logout", icon: "mdi-logout", color: "primary" },
      ],
      navPage : '',
    };
  },
};
</script>

<style scoped>
div.navSpacer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.navList {
  padding-right: 0px;
  height: calc(100% - 48px);
}
</style>
