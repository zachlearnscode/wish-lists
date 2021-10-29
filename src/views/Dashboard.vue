<template>
  <v-container>
    <loader :loading="loading"></loader>
    <div v-if="!loading">
      <v-card>
        <v-card-title class="green">
          My Wishlists
          <v-spacer></v-spacer>
          <v-card-actions class="pa-0">
            <v-btn @click="createNewWishlist" fab small><v-icon>mdi-plus</v-icon></v-btn>
          </v-card-actions>
        </v-card-title>
        
        
        <v-list>
          <v-list-item v-for="(wishlist, i) in wishlists" :key="i">
            <v-list-item-content>
              <v-list-item-title class="d-flex">
                <span class="align-self-center">{{ wishlist.nickname }}</span>
                <v-spacer></v-spacer>
                <v-list-item-action><v-btn small icon><v-icon>mdi-chevron-right</v-icon></v-btn></v-list-item-action>
              </v-list-item-title>
              
            </v-list-item-content>
          </v-list-item>          
        </v-list>        
      </v-card>
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