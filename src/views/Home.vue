<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        Welcome to Wish List
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import { db } from "../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";



export default {
  name: "Home",

  methods: {
    async testFn() {
      const testCollRef = collection(db, "testColl");

      await setDoc(doc(testCollRef, "Good Night"), {
        cruel: "World"
      })
      .catch(e => {
        console.log(e)
      })

      return;
    }
  },

  beforeMount() {
    if (!getAuth().currentUser) {
      console.log("No current user")
      this.$router.push("Login")
    } else {
      console.log(getAuth().currentUser)
    }
  }
};
</script>
