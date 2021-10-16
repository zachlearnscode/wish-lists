import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import AnimateCSS from 'animate.css';
import VeeValidate from 'vee-validate';

Vue.use(AnimateCSS);
Vue.use(VeeValidate);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
