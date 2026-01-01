<template>
  <div class="cart-page">
    <div class="title">購物車</div>
    <div class="box-frame" v-for="i in 5" :key="i">
      <div class="dish-box">
        <img src="../assets/images/homepage3.png" />
        <div class="info-frame">
          <div class="dish-info">
            <div class="dish-name">招牌牛肉麵</div>
            <div class="num-frame">
              <div class="num-btn" @click="CountDishAmount('-')">-</div>
              <div class="dish-amount">x{{ dishAmount }}</div>
              <div class="num-btn" @click="CountDishAmount('+')">+</div>
            </div>
          </div>
          <div class="dish-total-price">$450</div>
        </div>
        <div class="btn-frame">
          <input class="checkbox" type="checkbox" />
          <div class="cancel-btn">X</div>
        </div>
      </div>
    </div>
    <div class="check-frame">
      <div class="total-price">
        <span style="color: #272727">總計: </span>
        $1350
      </div>
      <div class="checkout-btn">結帳</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CartPage",
  setup() {
    const dishAmount = ref(3);

    const CountDishAmount = (operator) => {
      if (operator === "+") {
        dishAmount.value += 1;
      } else if (operator === "-" && dishAmount.value > 1) {
        dishAmount.value -= 1;
      }
    };

    return {
      dishAmount,
      CountDishAmount,
    };
  },
};
</script>

<style scoped>
.cart-page {
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.title {
  color: #f0c42d;
  font-size: 35px;
  font-weight: bold;
  margin: 20px 0;
}
.box-frame {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dish-box {
  width: 80%;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  margin: 20px;
  padding: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
}
img {
  width: 120px;
}
.info-frame {
  width: 100%;
  border-right: 1px solid #f0c42d;
  border-left: 1px solid #f0c42d;
  margin: 0 20px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.dish-info {
  width: 100%;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  transition: all 0.3s ease;
}
.num-btn:hover {
  background-color: #f0c42d;
  cursor: pointer;
}
.dish-amount {
  margin: 0 20px;
}
.dish-total-price {
  width: 100%;
  color: #f0c42d;
  font-size: 26px;
  font-weight: bold;
  text-align: end;
  margin-top: 20px;
}
.checkbox {
  appearance: none; /* 移除預設樣式 */
  width: 25px;
  height: 25px;
  border: 1px solid #f0c42d;
  border-radius: 5px;
  cursor: pointer;
}
.checkbox:checked {
  color: #ffffff;
  background-color: #f0c42d;
}
.cancel-btn {
  color: #f0c42d;
  font-size: 26px;
  margin-top: 15px;
}
.cancel-btn {
  cursor: pointer;
}
.check-frame {
  width: 100%;
  background-color: #ffffff;
  border-top: 4px solid #ffea9d;
  padding: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  position: fixed;
}
.total-price {
  height: 40px;
  color: #f0c42d;
  font-size: 28px;
  font-weight: bold;
  line-height: 40px;
  margin-right: 40px;
}
.checkout-btn {
  width: 100px;
  height: 40px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  background-color: #f0c42d;
  border-radius: 20px;
  margin-right: 50px;
  transition: all 0.3s ease;
}
.checkout-btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
</style>
