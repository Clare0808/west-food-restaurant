<template>
  <div class="check-page">
    <div class="title">訂單確認</div>
    <div class="order-frame">
      <div class="sec-title">訂單標號</div>
      <div class="order-info">MM012345678</div>
    </div>
    <div class="order-frame">
      <div class="sec-title">訂餐時間</div>
      <div class="order-info">2024-06-01 12:30</div>
    </div>
    <div class="dish-outframe">
      <div v-for="buy in buyList" :key="buy">
        <div class="dish-frame">
          <div class="dish-amount">x{{ buy.amount }}</div>
          <div class="dish-info">{{ buy.name }}</div>
          <div class="dish-price">${{ buy.total }}</div>
        </div>
      </div>
    </div>
    <div class="order-frame">
      <div class="sec-title">總計</div>
      <div class="total-price">${{ totalPrice }}</div>
    </div>
    <div class="btn">確認送出</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { buyList } from "../components/CartPage.vue";

export default {
  setup() {
    const totalPrice = ref(0);

    const CalculatePrice = () => {
      for (const data of buyList.value) {
        totalPrice.value += data.total;
      }
      console.log(buyList.value);
    };

    onMounted(() => {
      CalculatePrice();
    });

    return {
      buyList,
      totalPrice,
      CalculatePrice,
    };
  },
};
</script>

<style scoped>
.check-page {
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
.order-frame {
  width: 80%;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dish-outframe {
  width: 80%;
  margin: 20px 0;
}
.dish-frame {
  font-size: 20px;
  display: grid;
  grid-template-columns: 10% 80% 10%;
  justify-items: start;
}
.dish-amount,
.total-price {
  color: #f0c42d;
}
.dish-price {
  width: 100%;
  text-align: end;
}
.btn {
  width: 120px;
  height: 40px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  background-color: #f0c42d;
  border-radius: 20px;
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
