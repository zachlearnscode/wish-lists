import Vue from "vue";
import VueRouter from "vue-router";

//Views
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";

//Firebase User
import { currentUser } from "../main";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      console.log("Hello from Router", currentUser)
      if (!currentUser) next('/login');
      else next();
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
];

const router = new VueRouter({
  routes,
});

export default router;
