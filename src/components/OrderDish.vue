<template>
  <div class="order-page">
    <div class="title">訂購菜色</div>
    <img :src="orderList.image" />
    <div class="dish-info-frame">
      <div class="dish-name">{{ orderList.name }}</div>
      <div class="dish-description">{{ orderList.description }}</div>
      <div class="dish-price">${{ orderList.price }}</div>
    </div>
    <div class="btn-frame">
      <div class="num-frame">
        <div class="num-btn" @click="CountDishAmount('-')">-</div>
        <div class="num-text">{{ dishAmount }}</div>
        <div class="num-btn" @click="CountDishAmount('+')">+</div>
      </div>
      <div class="btn">加入購物車</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { orderList } from "../components/MenuPage.vue";

export const dishAmount = ref(1);

export default {
  setup() {
    const CountDishAmount = (operator) => {
      if (operator === "+") {
        dishAmount.value += 1;
      } else if (operator === "-" && dishAmount.value > 1) {
        dishAmount.value -= 1;
      }
    };

    return {
      orderList,
      dishAmount,
      CountDishAmount,
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
.btn-frame {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.num-frame {
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.num-btn {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  margin: 0 15px;
  transition: all 0.3s ease;
}
.num-btn:hover {
  background-color: #f0c42d;
  cursor: pointer;
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
  transition: all 0.3s ease;
}
.btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
</style>
