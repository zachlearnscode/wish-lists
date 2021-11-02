<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else>
      <dashboard-list :title="'Wishlists'" :btnIcon="'plus-thick'" :list="wishlists"></dashboard-list>
      <dashboard-list :title="'Groups'" :btnIcon="'account-plus'" :list="groups"></dashboard-list>
    </div>
  </div>
</template>

<script>
//Firebase Imports
import { firebaseDB, setSnapshotListeners } from "../main";
import { doc, collection, addDoc, updateDoc } from "firebase/firestore";

//Component Imports
import Loader from "../components/Loader.vue";
import DashboardList from "../components/DashboardList.vue";

export default {
  props: ['userID'],

  components: {
    Loader,
    DashboardList
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

    goToWishlist(id) {
      this.$router.push({ path: `/wishlist/${id}` });
    }
  },

  filters: {
    formatDate(timestamp) {
      return new Date(timestamp).toString()
    }
  },

  created() {
    const pathToUserDoc = `users/${this.userID}`;
    const userDocSnapshotCallback = userDoc => {
      const data = userDoc.data();
      this.wishlists = data.wishlists;
    }
    const userDocSnapshotArgs = {
      path: pathToUserDoc,
      snapshotQuery: false,
      callback: userDocSnapshotCallback
    }

    setSnapshotListeners([userDocSnapshotArgs])

    this.loading = false;
  },

  // destroyed() {
  //   removeSnapshotListener("users", this.userID, userDoc => {
  //     const data = userDoc.data();
  //     this.wishlists = data.wishlists;

  //     this.loading = false;
  //   })();
  // }
}
</script>

<style>

</style>