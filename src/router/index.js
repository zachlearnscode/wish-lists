import Vue from "vue";
import VueRouter from "vue-router";

//Views
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Wishlist from "../views/Wishlist.vue";


//Firebase User
import { currentUser } from "../main";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (currentUser) next(`/dashboard/${currentUser.uid}`);
      else next();
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard/:userID",
    component: Dashboard,
    props: true
  },
  {
    path: "/wishlist/:wishlistID",
    component: Wishlist,
    props: true
  }
];

const router = new VueRouter({
  routes,
});

export default router;
