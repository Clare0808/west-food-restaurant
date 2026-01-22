<template>
  <nav>
    <div class="logo">Le Savor 西饗</div>
    <div class="function-frame">
      <router-link to="/">主頁</router-link>
      <router-link to="/menu">菜單</router-link>
      <router-link to="/review">評論</router-link>
      <div class="server" @click="ClickServer">客服中心</div>
    </div>
    <div class="icon-frame" v-show="userStore.isAuthenticated">
      <router-link to="/cart">
        <i class="fa-solid fa-cart-shopping"></i>
      </router-link>
      <router-link to="/user">
        <i class="fa-solid fa-user"></i>
      </router-link>
      <router-link to="/login">
        <i
          class="fa-solid fa-arrow-right-from-bracket"
          @click="HandleLogout"
        ></i>
      </router-link>
    </div>
    <i
      class="fa-solid fa-bars"
      id="mobile-menu"
      @click="showMobile = true"
      v-show="showMobileMenu"
    ></i>
    <router-link
      to="/login"
      class="login-sign-btn"
      v-show="!userStore.isAuthenticated"
      >登入/註冊
    </router-link>
  </nav>

  <div class="overlay" v-show="showMobile" @click="showMobile = false"></div>
  <transition name="x-slide">
    <MobileMenu class="mobile-ele" v-if="showMobile" />
  </transition>
  <router-view />
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  errorText,
  errorType,
  showError,
} from "../src/components/LoginPage.vue";
import MobileMenu from "../src/components/MobileMenu.vue";
import { useUserStore } from "@/store/user";

export const showMobile = ref(false);
export const showMobileMenu = ref(false);

export default {
  components: {
    MobileMenu,
  },
  setup() {
    const showText = ref(false);
    const showImage = ref(false);
    const router = useRouter();
    const userStore = useUserStore();

    const HandleLogout = () => {
      userStore.logout();
      router.push("/login");
    };

    const ClickServer = () => {
      if (!userStore.isAuthenticated) {
        router.push("/login");

        errorText.value = "請先登入帳號!";
        errorType.value = true;

        showError.value = true;

        setTimeout(() => {
          showError.value = false;
        }, 2000);
      } else {
        router.push("/contact");
      }
    };

    onMounted(() => {
      showText.value = true;
      showImage.value = true;
      showMobileMenu.value = true;
    });

    return {
      errorText,
      errorType,
      showError,
      showMobile,
      showMobileMenu,
      showText,
      showImage,
      userStore,
      HandleLogout,
      ClickServer,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Brush Script MT", cursive; // 字體設定
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #272727;

  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  overflow-x: hidden;
}

body {
  // 周圍不留空白
  margin: 0;
  padding: 0;
}
nav {
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 35px;
  font-weight: bold;
}
.function-frame {
  display: flex;
}
.function-frame a {
  color: #272727;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  margin: 0 20px;
  display: inline-block; // 讓動畫生效
  transition: all 0.3s ease;
}
.function-frame a:hover {
  color: #f0c42d;
  cursor: pointer;
  transform: scale(1.1);
}
.server {
  color: #272727;
  font-size: 24px;
  font-weight: bold;
  margin: 0 20px;
  transition: all 0.3s ease;
}
.server:hover {
  color: #f0c42d;
  cursor: pointer;
  transform: scale(1.1);
}
.function-frame a:focus {
  color: #f0c42d;
}
.icon-frame i {
  color: #272727;
  font-size: 18px;
  margin: 0 10px;
  display: inline-block; // 讓動畫生效
  transition: all 0.3s ease;
}
.icon-frame i:hover {
  color: #f0c42d;
  transform: scale(1.1);
}
.login-sign-btn {
  width: 120px;
  height: 40px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  background-color: #f0c42d;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.login-sign-btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
#mobile-menu {
  display: none;
  transition: all 0.3s ease;
}
#mobile-menu:hover {
  color: #f0c42d;
  transform: scale(1.1);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 98;
}
.mobile-ele {
  height: 90vh;
  position: fixed;
  top: 50%;
  left: 0%;
  transform: translate(0%, -50%);
  z-index: 99;
}

.x-slide-enter-active,
.x-slide-leave-active {
  transition: all 1s ease;
}
.x-slide-enter-from,
.x-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px) translate(0%, -50%);
}
.x-slide-enter-to,
.x-slide-leave-from {
  opacity: 1;
  transform: translateX(0) translate(0%, -50%);
}

@media (max-width: 850px) {
  .function-frame,
  .icon-frame,
  .login-sign-btn {
    display: none;
  }
  #mobile-menu {
    display: block;
  }
}
</style>
