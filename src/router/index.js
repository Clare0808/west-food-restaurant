import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MenuPage from "../components/MenuPage.vue";
import ReviewPage from "../components/ReviewPage.vue";
import ServerPage from "../components/ServerPage.vue";
import CartPage from "../components/CartPage.vue";
import UserPage from "../components/UserPage.vue";
import LoginPage from "../components/LoginPage.vue";
import BackHome from "../components/backstage/HomePage.vue";
import BackMenu from "../components/backstage/MenuPage.vue";
import BackOrder from "../components/backstage/OrderPage.vue";
import BackReview from "../components/backstage/ReviewPage.vue";
import BackChart from "../components/backstage/ChartPage.vue";
import BackContact from "../components/backstage/ServerPage.vue";
import BackUser from "../components/backstage/UserPage.vue";

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
    path: "/contact",
    name: "ServerPage",
    component: ServerPage,
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
      {
        path: "/back-chart",
        name: "BackChart",
        component: BackChart,
      },
      {
        path: "/back-contact",
        name: "BackContact",
        component: BackContact,
      },
      {
        path: "/back-user",
        name: "BackUser",
        component: BackUser,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
