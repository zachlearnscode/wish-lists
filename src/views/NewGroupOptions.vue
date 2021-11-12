<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">Join a Group</v-col>
      <v-col v-for="(option, j) in joinOptions" :key="j">
        <v-btn block :disabled="option.disabled">{{ option.type  }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">Create a Group</v-col>
      <v-col v-for="(option, c) in createOptions" :key="c">
        <v-btn block :disabled="option.disabled">{{ option.type }}</v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          purpose: "join",
          type: "Join a group",
          disabled: false
        },
        {
          purpose: "create",
          type: "Many-to-many",
          disabled: false
        },
        {
          purpose: "create",
          type: "Many-to-one",
          disabled: true
        },
        {
          purpose: "create",
          type: "One-to-many",
          disabled: true
        }
      ]
    }
  },
  computed: {
    joinOptions() {
      return this.options.filter(o => o.purpose === 'join');
    },
    createOptions() {
      return this.options.filter(o => o.purpose === 'create');
    }
  }

}
</script>

<style>

</style>