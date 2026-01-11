import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MenuPage from "../components/MenuPage.vue";
import ReviewPage from "../components/ReviewPage.vue";
import CartPage from "../components/CartPage.vue";
import UserPage from "../components/UserPage.vue";
import LoginPage from "../components/LoginPage.vue";
import BackHome from "../components/backstage/HomePage.vue";
import BackMenu from "../components/backstage/MenuPage.vue";
import BackOrder from "../components/backstage/OrderPage.vue";
import BackReview from "../components/backstage/ReviewPage.vue";

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
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/back-home",
    name: "BackHome",
    component: BackHome,
    children: [
      {
        path: "/back-menu",
        name: "BackMenu",
        component: BackMenu,
      },
      {
        path: "/back-order",
        name: "BackOrder",
        component: BackOrder,
      },
      {
        path: "/back-review",
        name: "BackReview",
        component: BackReview,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
