import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//3rd Party Plugins
import vuetify from "./plugins/vuetify";
import AnimateCSS from 'animate.css';
  Vue.use(AnimateCSS);
import VeeValidate from 'vee-validate';
  Vue.use(VeeValidate);

//Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection, query, onSnapshot } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDhICVCsK3nkAhi-I_EZdbvfC-a4RxbmwM",
  authDomain: "wish-lists-db0e1.firebaseapp.com",
  projectId: "wish-lists-db0e1",
  storageBucket: "wish-lists-db0e1.appspot.com",
  messagingSenderId: "664033555049",
  appId: "1:664033555049:web:8d872b8ded92d2e89468f8"
};

initializeApp(firebaseConfig);
export const firebaseDB = getFirestore();

export const setSnapshotListeners = (arr) => {
  arr.forEach(({path, snapshotQuery, callback}) => {
    if (snapshotQuery) {
      if (typeof snapshotQuery === "boolean") {
        return onSnapshot(query(collection(firebaseDB, path)), callback);
      } else {
        return onSnapshot(query(collection(firebaseDB, path), snapshotQuery), callback);
      }
    }
    
    return onSnapshot(doc(firebaseDB, path), callback);
  })
};

Vue.config.productionTip = false;

var vue = null;
export let currentUser = null;

//Don't initialize Vue instance until observer set on user status.
onAuthStateChanged(getAuth(), user => {
  currentUser = user;

  if (!vue) {
    vue = new Vue({
      router,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");    
  }
});



