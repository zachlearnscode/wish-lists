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

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
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
      let userCredential, userID;
      
      try {
        if (btnID === 'login') {
          userCredential = await signInWithEmailAndPassword(getAuth(), this.email, this.password);
        } else if (btnID === 'signup') {
          userCredential = await createUserWithEmailAndPassword(getAuth(), this.email, this.password);
        }
      } catch(err) {
          console.log("Error in Submit ", err);
      }

      userID = userCredential.user.uid;

      if (btnID === "signup") {
        this.writeNewUserToFirestore(userID);
      }

      return this.$router.push(`/dashboard/${userID}`);
    },
    async writeNewUserToFirestore(uid) {
      const db = getFirestore();

      try {
        await setDoc(doc(db, 'users', uid), {
          displayName: this.displayName,
          groups: {},
          wishLists: {}
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