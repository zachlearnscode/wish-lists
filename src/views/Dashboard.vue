<template>
  <v-container>
    <loader :loading="loading"></loader>
    <div v-if="!loading">
      <div class="rounded green pt-10 px-1 pb-1">
        <v-btn block v-for="wishlist in wishlists" :key="wishlist">{{wishlist.nickname}}</v-btn>
        <v-btn @click="createNewWishlist" block class="pa-3">Create new wishlist</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { firebaseDB } from "../main";
import { doc, collection, addDoc, updateDoc,  onSnapshot, serverTimestamp } from "firebase/firestore";

const setSnapshotListener = function(collection, document, callback) {
  return onSnapshot(doc(firebaseDB, collection, document), callback);
};

const removeSnapshotListener = setSnapshotListener;

import Loader from "../components/Loader.vue";

export default {
  props: ['userID'],

  components: {
    Loader
  },

  data() {
    return {
      loading: true,

      displayName: "",
      groups: undefined,
      wishlists: undefined
    }
  },

  methods: {
    async createNewWishlist() {
      const newWishlistRef = await addDoc(collection(firebaseDB, "wishlists"), {
        createdBy: this.userID,
        createdOn: serverTimestamp()
      })

      this.addWishlistRefrenceToUserDoc(newWishlistRef);
    },

    async addWishlistRefrenceToUserDoc(ref) {
      const userDocRef = doc(firebaseDB, "users", this.userID);

      await updateDoc(userDocRef, {
        ['wishlists.' + `${ref.id}`]: {
          path: ref.path,
          nickname: "Wishlist " + (Object.keys(this.wishlists).length + 1)
        }
      })
    }
  },

  created() {
    setSnapshotListener("users", this.userID, document => {
      let user = document.data();

      this.displayName = user.displayName;
      this.groups = user.groups;
      this.wishlists = user.wishlists;


      this.loading = false;
    })
  },

  destroyed() {
    removeSnapshotListener("users", this.userID, document => {
      let user = document.data();

      this.displayName = user.displayName;
      this.groups = user.groups;
      this.wishlists = user.wishlists;
      
      this.loading = false;
    })();
  }

}
</script>

<style>

</style>