<template>
  <v-form @submit.prevent="submit($event.submitter.id)">
    <v-text-field
      type="email"
      v-model="email"
      placeholder="Email"
      autofocus
      outlined
    ></v-text-field>

    <v-text-field
      type="password"
      v-model="password"
      placeholder="Password"
      outlined
    ></v-text-field>

    <v-btn type="submit" id="login" block>Log in</v-btn>

    <v-text-field
      type="password"
      v-model="confirmPassword"
      placeholder="Confirm Password"
      outlined
    ></v-text-field>

    <v-text-field
      v-model="firstName"
      placeholder="First Name"
      outlined
    ></v-text-field>
    <v-btn type="submit" id="signup" block>Sign up</v-btn
    >
  </v-form>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      user: "",

      email: "",
      password: "",

      confirmPassword: "",
      firstName: ""
    };
  },

  methods: {
    async submit(btnID) {
        let userCredential;
        const auth = getAuth();

        if (btnID === 'login') {
            userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        } else if (btnID === 'signup') {
            if (this.password === this.confirmPassword) {
                userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
            }
        }

      if (userCredential) {
        this.user = userCredential.user;
      } else {
        console.log("Error");
      }
    },
  },
};
</script>

<style>
</style>