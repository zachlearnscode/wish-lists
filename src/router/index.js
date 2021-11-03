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
      if (currentUser) next(`/dashboard`);
      else next();
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    props: () => ({ userID: currentUser.uid }),
    meta: {
      requiresAuth: true
    }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (currentUser) next()
    else next('/')
  } else {
    next();
  }
})

export default router;
