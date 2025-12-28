<template>
  <div class="order-page">
    <div class="title">訂購菜色</div>
    <img :src="orderList.image" />
    <div class="dish-info-frame">
      <div class="dish-name">{{ orderList.name }}</div>
      <div class="dish-description">{{ orderList.description }}</div>
      <div class="dish-price">${{ orderList.price }}</div>
    </div>
    <div class="btn">加入購物車</div>
  </div>
</template>

<script>
import { orderList } from "../components/MenuPage.vue";

export default {
  setup() {
    return {
      orderList,
    };
  },
};
</script>

<style scoped>
.order-page {
  width: 65%;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #f0c42d;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  color: #f0c42d;
  font-size: 35px;
  font-weight: bold;
  margin: 20px 0;
}
img {
  width: 250px;
  margin: 20px 0;
}
.dish-name {
  width: 100%;
  font-size: 24px;
  text-align: start;
  border-top: 1px solid #f0c42d;
  padding-top: 20px;
}
.dish-description {
  font-size: 20px;
  text-align: start;
  margin: 20px 0;
}
.dish-price {
  color: #f0c42d;
  font-size: 24px;
  text-align: end;
}
.btn {
  width: 150px;
  height: 40px;
  color: #ffffff;
  font-size: 20px;
  background-color: #f0c42d;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  margin-top: 20px;
  transition: all 0.3s ease;
}
.btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
</style>
