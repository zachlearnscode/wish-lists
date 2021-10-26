<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-toolbar-title>Wish Lists</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-list dense nav>
        <v-list-item v-for="(page, i) in pages" :key="i" link>
          <v-list-item-content>
            <v-list-item-title>{{ page }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>{{currentUser ? 'Sign Out' : 'Sign In'}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { currentUser } from "../src/main";

export default {
  name: "App",

  data() {
    return {
      currentUser: currentUser,
      drawer: false,
      pages: ["Profile", "Wish List", "Pledges"]
    }
  },
};
</script>
