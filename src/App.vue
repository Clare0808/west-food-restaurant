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
      <i class="fa-solid fa-arrow-right-from-bracket" @click="HandleLogout"></i>
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

  <div
    class="overlay"
    v-show="showLogoutCheck"
    @click="showLogoutCheck = false"
  ></div>
  <transition name="slide-check">
    <LogoutCheck class="logout-check" v-if="showLogoutCheck" />
  </transition>

  <transition name="err-slide">
    <ErrorMessage class="error-msg" v-show="errorStore.showErrorMsg" />
  </transition>

  <transition name="slide-check">
    <LoadingEle v-if="errorStore.showLoader" />
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/store/user";
import { errorUiStore } from "@/store/error";

import MobileMenu from "../src/components/MobileMenu.vue";
import LogoutCheck from "../src/components/LogoutCheck.vue";
import ErrorMessage from "../src/components/ErrorMessage.vue";
import LoadingEle from "../src/components/LoadingEle.vue";

export const showMobile = ref(false);
export const showMobileMenu = ref(false);
export const showLogoutCheck = ref(false);

export default {
  components: {
    MobileMenu,
    LogoutCheck,
    ErrorMessage,
    LoadingEle,
  },
  setup() {
    const showText = ref(false);
    const showImage = ref(false);
    const router = useRouter();
    const userStore = useUserStore();
    const errorStore = errorUiStore();

    const HandleLogout = () => {
      showLogoutCheck.value = true;
    };

    const ClickServer = async () => {
      if (!userStore.isAuthenticated) {
        errorStore.LoadError("請先登入帳號!");

        await errorStore.CloseLoadEle();
        router.push("/login");
      } else {
        router.push("/contact");
      }
    };

    onMounted(async () => {
      showText.value = true;
      showImage.value = true;
      showMobileMenu.value = true;

      if (!userStore.isAuthenticated) {
        try {
          await userStore.googleLogin();

          errorStore.LoadSuccess("登入成功!");

          localStorage.setItem("userEmail", userStore.user.email);
          localStorage.setItem("userName", userStore.user.name);
          localStorage.setItem("inAdmin", userStore.isAdmin);
        } catch (err) {
          errorStore.SetError(err.message);

          router.push("/login");
        }
      }

      await errorStore.CloseLoadEle();
    });

    return {
      showMobile,
      showMobileMenu,
      showLogoutCheck,
      showText,
      showImage,
      userStore,
      errorStore,
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
  cursor: pointer;
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
.logout-check {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
.error-msg {
  position: fixed;
  top: 90px;
  right: 20px;
  z-index: 3;
}

.slide-check-enter-active,
.slide-check-leave-active {
  transition: all 1s ease;
}
.slide-check-enter-from,
.slide-check-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(20px);
}
.slide-check-enter-to,
.slide-check-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
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
.err-slide-enter-active,
.err-slide-leave-active {
  transition: all 1s ease;
}
.err-slide-enter-from,
.err-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.err-slide-enter-to,
.err-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
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
