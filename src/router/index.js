import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MenuPage from "../components/MenuPage.vue";
import ReviewPage from "../components/ReviewPage.vue";
import CartPage from "../components/CartPage.vue";
import UserPage from "../components/UserPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/menu",
    name: "MenuPage",
    component: MenuPage,
  },
  {
    path: "/review",
    name: "ReviewPage",
    component: ReviewPage,
  },
  {
    path: "/cart",
    name: "CartPage",
    component: CartPage,
  },
  {
    path: "/user",
    name: "UserPage",
    component: UserPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
