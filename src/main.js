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
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDhICVCsK3nkAhi-I_EZdbvfC-a4RxbmwM",
  authDomain: "wish-lists-db0e1.firebaseapp.com",
  projectId: "wish-lists-db0e1",
  storageBucket: "wish-lists-db0e1.appspot.com",
  messagingSenderId: "664033555049",
  appId: "1:664033555049:web:8d872b8ded92d2e89468f8"
};

initializeApp(firebaseConfig);

const auth = getAuth();
export let currentUser = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  return currentUser = user;
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
