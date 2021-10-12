<template>
  <v-container :fluid="$vuetify.breakpoint.name == 'xs'">
    <v-expansion-panels multiple>
      <wish-list></wish-list>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import WishList from "../components/WishList.vue";

export default {
  name: "Home",

  components: {
    WishList
  }
};
</script>
