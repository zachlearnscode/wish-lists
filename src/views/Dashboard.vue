<template>
  <v-container>
    <loader :loading="loading"></loader>
    <div v-if="!loading">
      <v-card class="elevation-5">
        <v-card-title class="green">
          My Wishlists
          <v-spacer></v-spacer>
          <v-card-actions class="pa-0">
            <v-btn @click="createNewWishlist" fab small><v-icon>mdi-plus</v-icon></v-btn>
          </v-card-actions>
        </v-card-title>
        
        <v-list two-line>
          <template v-if="Object.keys(wishlists).length">
            <v-list-item v-for="(wishlist, i) in wishlists" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ wishlist.nickname }}</v-list-item-title>
                <v-list-item-subtitle>Created: {{ wishlist.created | formatDate }}</v-list-item-subtitle>                
              </v-list-item-content>
              <v-list-item-action>
                <v-btn @click="goToWishlist(wishlist.id)" small icon>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>          
          </template>
          <template v-else>
            <div class="text-center grey--text text--lighten-1">No wishlists to display.</div>
          </template>
        </v-list>        
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { firebaseDB } from "../main";
import { doc, collection, addDoc, updateDoc, onSnapshot } from "firebase/firestore";

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
      groups: {},
      wishlists: {}
    }
  },

  methods: {
    async createNewWishlist() {
      const wishlistData = {
        owner: this.userID,
        created: new Date().getTime(),
        nickname: "Untitled Wishlist"
      }

      const newWishlistRef = await addDoc(collection(firebaseDB, "wishlists"), wishlistData);

      this.addWishlistReferenceToUserDoc(newWishlistRef, wishlistData);

      this.goToWishlist(newWishlistRef.id);
    },

    async addWishlistReferenceToUserDoc(ref, data) {
      const userRef = doc(firebaseDB, "users", this.userID);

      delete data.owner;

      await updateDoc(userRef, {
        ['wishlists.' + `${ref.id}`]: {
          id: ref.id,
          ...data
        }
      })
    },

    goToWishlist(wishlistID) {
      this.$router.push({ path: `/wishlist/${wishlistID}` });
    }
  },

  filters: {
    formatDate(timestamp) {
      return new Date(timestamp).toString()
    }
  },

  created() {
    setSnapshotListener("users", this.userID, userDoc => {
      const data = userDoc.data();
      this.wishlists = data.wishlists;

      this.loading = false;
    })
  },

  destroyed() {
    removeSnapshotListener("users", this.userID, userDoc => {
      const data = userDoc.data();
      this.wishlists = data.wishlists;

      this.loading = false;
    })();
  }
}
</script>

<style>

</style>