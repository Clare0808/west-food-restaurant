<template>
  <div class="back-home">
    <transition name="slide">
      <div class="btn-outframe" v-if="showSlide">
        <div class="text-frame">
          <div class="logo">Le Savor 西饗</div>
          <div class="sec-title">後台管理系統</div>
        </div>
        <div class="btn-frame">
          <router-link to="/back-menu">上架餐點</router-link>
          <router-link to="/back-order">訂單資訊</router-link>
          <router-link to="/back-statistic">數據統計</router-link>
          <router-link to="/back-review">客戶評論</router-link>
          <router-link to="/back-contact">客服聯絡</router-link>
        </div>
        <router-link to="/user" class="store-btn">返回</router-link>
      </div>
    </transition>

    <transition name="slide">
      <router-view class="child-page" v-if="showSlide" />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "BackHome",
  setup() {
    const showSlide = ref(false);

    onMounted(() => {
      showSlide.value = true;
    });

    return {
      showSlide,
    };
  },
};
</script>

<style scoped>
.back-home {
  width: 100vw;
  height: 100vh;
  background-color: #ffea9d;
  display: flex;
  justify-content: start;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}
.logo {
  font-size: 22px;
}
.btn-outframe {
  width: 120px;
  height: 80%;
  background-color: #ffffff;
  border-radius: 20px;
  margin-left: 30px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.sec-title {
  margin-top: 10px;
}
a {
  color: #bebebe;
  font-size: 22px;
  text-decoration: none;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}
a:hover {
  color: #f0c42d;
}
a:focus {
  color: #f0c42d;
}
.store-btn {
  font-size: 18px;
  margin: 0;
}

.child-page {
  width: calc(100% - 290px);
  height: 80%;
  position: absolute;
  right: 30px;
  border-radius: 20px;
  background-color: #ffffff;
  padding: 20px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
