<template>
  <nav>
    <div class="logo">Le Savor 西饗</div>
    <div class="function-frame">
      <router-link to="/">主頁</router-link>
      <router-link to="/menu">菜單</router-link>
      <router-link to="/review">評論</router-link>
      <router-link to="/contact">客服中心</router-link>
    </div>
    <div class="icon-frame" v-show="loginStatus">
      <router-link to="/cart">
        <i class="fa-solid fa-cart-shopping"></i>
      </router-link>
      <router-link to="/user">
        <i class="fa-solid fa-user"></i>
      </router-link>
      <router-link to="/login">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </router-link>
    </div>
    <router-link to="/login" class="login-btn" v-show="!loginStatus"
      >登入/註冊
    </router-link>
  </nav>
  <router-view />
</template>

<script>
import { ref, onMounted } from "vue";
import { loginStatus } from "./components/LoginPage.vue";

export default {
  setup() {
    const showText = ref(false);
    const showImage = ref(false);

    onMounted(() => {
      showText.value = true;
      showImage.value = true;
    });

    return {
      loginStatus,
      showText,
      showImage,
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
