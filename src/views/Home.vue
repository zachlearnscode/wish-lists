<template>
  <v-container fluid>
    <v-row>
      <v-col class="text-center">
        Welcome to Wish List
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" order-sm="2">
        <v-form>
          
        </v-form>
        <v-btn block>Log in</v-btn>
      </v-col>
      <v-col cols="12" sm="6" order-sm="1">
         <v-btn block>Sign up</v-btn>
       </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "../firebase/config";
import { collection, doc, setDoc } from "firebase/firestore";



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
};
</script>
