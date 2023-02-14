<template>
  <app-bar></app-bar>
  <v-navigation-drawer expand-on-hover rail class="pt-4" color="grey lighten-3">
    <v-list nav density="compact">
      <v-list-item v-for="(item, i) in navItems" :key="i" :value="item">
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>

    <div style="position: absolute; bottom: 0; width: 100%">
      <v-divider></v-divider>
      <v-list nav density="compact" active-class="">
        <v-list-item
          :prepend-avatar="userParam.avatar"
          :title="userParam.dispName"
          :subtitle="userParam.email"
        ></v-list-item>
        <v-list-item
          v-for="(item, i) in navParamItems"
          :key="i"
          :value="item"
          class="red"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      navItems: [{ text: "Home", icon: "mdi-home" }],
      userParam: {
        dispName: "Sandra Adams",
        avatar: "https://randomuser.me/api/portraits/women/85.jpg",
        email: "sandra_a88@gmailcom",
      },
      navParamItems: [
        { text: "Settings", icon: "mdi-cog" },
        { text: "Logout", icon: "mdi-logout", color: "red" },
      ],
    };
  },
};
</script>
