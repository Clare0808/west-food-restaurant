<template>
  <div class="mobile-ele">
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
    <router-link
      to="/login"
      class="login-btn"
      v-show="!userStore.isAuthenticated"
      >登入/註冊
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/store/user";
import { errorUiStore } from "@/store/error";

import { showLogoutCheck, showMobile } from "@/App.vue";

export default {
  name: "MobileMenu",
  setup() {
    const showText = ref(false);
    const showImage = ref(false);

    const router = useRouter();
    const userStore = useUserStore();
    const errorStore = errorUiStore();

    const HandleLogout = () => {
      showLogoutCheck.value = true;
      showMobile.value = false;
    };

    const ClickServer = async () => {
      if (!userStore.isAuthenticated) {
        showMobile.value = false;

        errorStore.LoadError("請先登入帳號!");

        await errorStore.CloseLoadEle();
        router.push("/login");
      } else {
        router.push("/contact");
      }
    };

    onMounted(() => {
      showText.value = true;
      showImage.value = true;
    });

    return {
      showLogoutCheck,
      showMobile,
      showText,
      showImage,
      userStore,
      HandleLogout,
      ClickServer,
    };
  },
};
</script>

<style scoped>
.mobile-ele {
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 35px;
  font-weight: bold;
}
.function-frame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.function-frame a {
  color: #272727;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  margin: 10px 0px;
  display: inline-block;
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
  margin: 10px 20px;
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
.icon-frame {
  display: flex;
}
.icon-frame i {
  color: #272727;
  font-size: 18px;
  margin: 0 10px;
  margin-top: 10px;
  display: inline-block;
  transition: all 0.3s ease;
}
.icon-frame i:hover {
  color: #f0c42d;
  transform: scale(1.1);
}
.login-btn {
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
.login-btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
</style>
