<template>
  <v-container>
    <credentials
      :email="email"
      @email="email = $event"
      :password="password"
      @password="password = $event"
      :confirmPassword="confirmPassword"
      @confirmPassword="confirmPassword = $event"
      :displayName="displayName"
      @displayName="displayName = $event"

      @submit="submit($event)"
    ></credentials>
  </v-container>
</template>

<script>
import Credentials from "../components/Credentials.vue";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
      displayName: "",
    };
  },

  methods: {
    async submit(btnID) {
      let userCredential, user;
      
      try {
        if (btnID === 'login') {
          userCredential = await signInWithEmailAndPassword(getAuth(), this.email, this.password);
        } else if (btnID === 'signup') {
          userCredential = await createUserWithEmailAndPassword(getAuth(), this.email, this.password);
        }
      } catch(err) {
          console.log("Error submitting login/signup form: ", err);
      }

      user = userCredential.user;

      if (btnID === "signup") {
        updateProfile(getAuth().currentUser, {
          displayName: this.displayName
        }).then(() => {
          this.writeNewUserToFirestore(userCredential.user)
        }).catch(err => {
          console.log("Error updating user profile with display name: ", err)
        })
      }

      return this.$router.push(`/dashboard/${user.uid}`);
    },
    async writeNewUserToFirestore(user) {
      const db = getFirestore();

      try {
        await setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName,
          email: user.email,
          wishlists: {},
          groups: {}
        })
      } catch(err) {
        console.log("Error in writeNewUserToFirestore: ", err)
      }
    }
  }
};
</script>

<style>
</style>