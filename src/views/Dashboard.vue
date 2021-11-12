<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else>
      <dashboard-list :title="'Wishlists'" :btnIcon="'plus-thick'" :list="wishlists" :dialog="wishlistDialog" @action-button-click="wishlistDialog = true">
		<template v-slot:actionDialog>
			<create-wishlist-form @wishlist-form-submitted="[createNewWishlist($event), wishlistDialog = false]" @wishlist-form-cancelled="wishlistDialog=false"></create-wishlist-form>
		</template>
	  </dashboard-list>
      <dashboard-list :title="'Groups'" :btnIcon="'account-plus'" :list="groups" :dialog="newGroupDialog" @action-button-click="newGroupDialog = true"></dashboard-list>
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
import CreateWishlistForm from "../components/CreateWishlistForm";

export default {
  props: ['userID'],

  components: {
    Loader,
    DashboardList,
	CreateWishlistForm
  },

  data() {
    return {
      loading: true,

      displayName: "",
      groups: {},
      wishlists: {},
	  
	  wishlistDialog: false,
	  newGroupDialog: false
    }
  },

  methods: {
    async createNewWishlist(nickname) {
      const wishlistData = {
        owner: this.userID,
        created: new Date().getTime(),
        nickname: nickname
      }

      const newWishlistRef = await addDoc(collection(firebaseDB, "wishlists"), wishlistData);
	  
	  console.log(newWishlistRef)

      this.addWishlistReferenceToUserDoc(newWishlistRef, wishlistData);

      //this.goToWishlist(newWishlistRef.id);
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