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
                <v-list-item-subtitle>Created: {{ wishlist.createdOn | formatDate }}</v-list-item-subtitle>                
              </v-list-item-content>
              <v-list-item-action>
                <v-btn @click="goToWishlist(wishlist.wishlistID)" small icon>
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
      groups: undefined,
      wishlists: undefined
    }
  },

  methods: {
    async createNewWishlist() {
      const newWishlistRef = await addDoc(collection(firebaseDB, "wishlists"), {
        owner: this.userID
      })

      this.addWishlistRefrenceToUserDoc(newWishlistRef, new Date().getTime());
    },

    async addWishlistRefrenceToUserDoc(ref, timestamp) {
      const userDocRef = doc(firebaseDB, "users", this.userID);

      await updateDoc(userDocRef, {
        ['wishlists.' + `${timestamp}`]: {
          wishlistID: ref.id,
          path: ref.path,
          createdOn: timestamp,
          nickname: "Untitled Wishlist",
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