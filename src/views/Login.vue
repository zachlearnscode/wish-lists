<template>
  <v-container>
    <credentials
      :email="email"
      @email="email = $event"
      :password="password"
      @password="password = $event"
      :confirmPassword="confirmPassword"
      @confirmPassword="confirmPassword = $event"
      :firstName="firstName"
      @firstName="firstName = $event"

      @submit="submit($event)"
    ></credentials>
  </v-container>
</template>

<script>
import { currentUser } from "../main";

import Credentials from "../components/Credentials.vue";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default {
  components: {
    Credentials,
  },

  data() {
    return {
      email: "",
      password: "",

      confirmPassword: "",
      firstName: "",
    };
  },

  methods: {
    getCurrentUser() {
      console.log(currentUser)
    },
    async submit(btnID) {
      const auth = getAuth();
      let userCredential;

      try {
        if (btnID === 'login') {
          userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        } else if (btnID === 'signup') {
          userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          this.writeNewUserToFirestore();
        }

        console.log(userCredential)
        // this.$router.push('/dashboard');
      } catch(err) {
          console.log(err);
      }
    },
    async writeNewUserToFirestore() {
      const db = getFirestore();

      await setDoc(doc(db, 'users', this.email), {
        name: this.firstName,
        wishLists: []
      })
    }
  }
};
</script>

<style>
</style>