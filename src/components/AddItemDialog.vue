//TODO: Validate Input fields
<template>
  <v-dialog v-model="open" fullscreen transition="slide-y-reverse-transition">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Add Wishlist Item
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field required label="Item Name" v-model="name"> </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Item Link"  v-model="link"> </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea label="Notes"  v-model="notes"> </v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-slider
                label="Priority"
                v-model="priority"
                :tick-labels="priorityLabels"
                :max="2"
                step="1"
                ticks="always"
                tick-size="4"
              ></v-slider>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="[$emit('exitDialog'), clearInputs]">
          Cancel
        </v-btn>
        <v-btn color="primary" text @click="[$emit('exitDialog', {name, link, notes, priority}), clearInputs]">
          Save Item
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["open"],

  data() {
    return {
      name: "",
      link: "",
      notes: "",
      priority: 1,
      priorityLabels: ["Low", "Normal", "High"]
    }
  },

  methods: {
    clearInputs() {
      this.name = "";
      this.link = "";
      this.notes = "";
      this.priority = 1;
    }
  }
};
</script>

<style>
</style>