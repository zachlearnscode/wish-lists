<template>
  <div>
    <loader v-if="loading"></loader>
    <v-container v-else>
      <v-row>
        <v-col v-if="!editingName" class="d-flex justify-center align-center">
          <span class="text-h5 font-weight-light">{{wishlist.nickname}}</span>
          <v-btn @click="editingName = true" class="ml-3" icon small>
            <v-icon small>mdi-square-edit-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col v-else>
          <form @submit.prevent="updateWishlistNickname" class="d-flex justify-center align-center">
          <v-text-field v-model="wishlistNickname" autofocus placeholder="Wishlist nickname" maxlength="20" counter class="pa-0"></v-text-field>
          <v-btn @click="[editingName = false, wishlistNickname = '']" class="ml-3" icon small>
            <v-icon color="red">mdi-close-circle</v-icon>
          </v-btn>
          <v-btn type="submit" icon small :disabled="!wishlistNickname">
            <v-icon color="green">mdi-check-circle</v-icon>
          </v-btn>
          </form>
        </v-col>
      </v-row>
      <v-row>
        <v-col             class="pt-0">
          <v-btn
            color="red lighten-2"
            dark
            block
            @click="dialog = true"
          >
            Add Item
          </v-btn>
        </v-col>
        <add-item-dialog :wishlistID="wishlistID" :open="dialog" @exitDialog="$event ? processAddItem($event) : closeDialog()"></add-item-dialog>
      </v-row>
      <v-expansion-panels class="mt-3" multiple>
        <v-expansion-panel v-for="(item, i) in items" :key="i">
          <v-expansion-panel-header>
            {{item.name}}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row>
                <v-col cols="auto">Link:</v-col>
                <v-col>{{item.link}}</v-col>
              </v-row>
              <v-row>
                <v-col cols="auto">Notes:</v-col>
                <v-col>{{item.notes}}</v-col>
              </v-row>
              <v-row>
                <v-col cols="auto">Priority:</v-col>
                <v-col>{{ item.priority | convertPriority }}</v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import AddItemDialog from "../components/AddItemDialog.vue";

import { firebaseDB, setSnapshotListeners } from "../main";
import { setDoc,  doc, updateDoc } from "firebase/firestore";

// const setSnapshotListener = function(collection, document, callback) {
//   return onSnapshot(doc(firebaseDB, collection, document), callback);
// };

// const removeSnapshotListener = setSnapshotListener;

export default {
  props: ["wishlistID"],

  components: {
    Loader,
    AddItemDialog
  },

  data() {
    return {
      loading: true,

      wishlist: undefined,
      editingName: false,
      wishlistNickname: "",
      items: [],
      dialog: false,
      snapshot: undefined
    }
  },

  methods: {
    async updateWishlistNickname() {
      //TODO: Batch write to summary in User doc.
      const wishlistRef = doc(firebaseDB, "wishlists", this.wishlistID);

      await updateDoc(wishlistRef, {
        nickname: this.wishlistNickname
      })

      this.editingName = false;
      this.wishlistNickname = "";
    },

    closeDialog() {
      this.dialog = false;
    },

    async processAddItem(details) {
      await setDoc(doc(firebaseDB, "wishlists", this.wishlistID, "items", details.name), {
        ...details
      })

      this.closeDialog();
    }
  },

  filters: {
    convertPriority(num) {
      let result;

      switch (num) {
        case 0: 
          result = "Low";
          break;
        case 1: 
          result = "Normal";
          break;
        case 2: {
          result = "High";
          break;
        }
      }

      return result;
    }
  },

  created() {
    const pathToWishlistDoc = `wishlists/${this.wishlistID}`;
    const wishlistDocSnapshotArgs = {
      path: pathToWishlistDoc,
      snapshotQuery: false,
      callback: wishlistDoc => {
        this.wishlist = wishlistDoc.data();
      }
    }

    const pathToItemsSubcollection = `wishlists/${this.wishlistID}/items`;
    const itemsSubcollectionSnapshotArgs = {
      path: pathToItemsSubcollection,
      snapshotQuery: true,
      callback: querySnapshot => {
        let itemsInClient = this.items.map(i => i.name);
        querySnapshot.forEach(doc => {
          const item = doc.data();
          if (!itemsInClient.includes(item.name)) {
            this.items.push(item);
          }
        })
        this.loading = false;
      }
    };

    setSnapshotListeners([wishlistDocSnapshotArgs, itemsSubcollectionSnapshotArgs]);
  }

  // destroyed() {
  //   removeSnapshotListener("wishlists", this.wishlistID, wishlistDoc => {
  //     wishlistDoc.data();

  //     this.loading = false;
  //   })();
  // }

}
</script>

<style>

</style>