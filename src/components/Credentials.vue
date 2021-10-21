<template>
  <v-form
    @submit.prevent="$emit('submit', $event.submitter.id)"
    class="d-flex flex-column justify-space-between"
  >
    <v-text-field
      type="email"
      v-model="email_local"
      value="email"
      placeholder="Email"
      autofocus
      outlined
    ></v-text-field>

    <v-text-field
      type="password"
      :value="password"
      v-model="password_local"
      placeholder="Password"
      outlined
    ></v-text-field>

    <v-btn type="submit" id="login" block style="margin-bottom: 30px;">Log in</v-btn>

    <v-text-field
      type="password"
      :value="confirmPassword"
      v-model="confirmPassword_local"
      placeholder="Confirm Password"
      outlined
    ></v-text-field>

    <v-text-field
      :value="displayName"
      v-model="displayName_local"
      placeholder="Display Name"
      outlined
    ></v-text-field>
    <v-btn type="submit" id="signup" block>Sign up</v-btn>
  </v-form>
</template>

<script>

export default {
  props: ["email", "password", "confirmPassword", "displayName"],
  data() {
    return {
      email_local: "",
      password_local: "",
      confirmPassword_local: "",
      displayName_local: "",
    };
  },

  watch: {
    email_local() {
      this.$emit("email", this.email_local);
    },
    password_local() {
      this.$emit("password", this.password_local);
    },
    confirmPassword_local() {
      this.$emit("confirmPassword", this.confirmPassword_local);
    },
    displayName_local() {
      this.$emit("displayName", this.displayName_local);
    },
  },
};
</script>

<style>
</style>