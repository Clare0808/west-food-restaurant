<template>
  <div class="cart-page">
    <transition name="x-slide">
      <ErrorMessage class="error-msg" v-show="showErrorMsg" />
    </transition>
    <transition name="fade">
      <div class="title" v-if="showFade">購物車</div>
    </transition>
    <div class="top-btn-frame">
      <div
        class="all-btn"
        @click="SelectAll"
        :class="{ active: selectAllClick }"
      >
        全部選取
      </div>
      <div class="clean-btn" @click="RemoveAllOrder">一鍵刪除</div>
    </div>
    <transition name="slide">
      <div class="box-frame" v-if="showSlide">
        <div
          class="dish-box-outframe"
          v-for="(order, index) in filteredData"
          :key="order"
        >
          <div class="dish-box">
            <img :src="order.image" />
            <div class="info-frame">
              <div class="dish-info">
                <div class="dish-name">{{ order.name }}</div>
                <div class="num-frame">
                  <div class="num-btn" @click="CountDishAmount('-', index)">
                    -
                  </div>
                  <div class="dish-amount">x{{ order.amount }}</div>
                  <div class="num-btn" @click="CountDishAmount('+', index)">
                    +
                  </div>
                </div>
              </div>
              <div class="dish-total-price">{{ order.total }}</div>
            </div>
            <div class="btn-frame">
              <input
                class="checkbox"
                type="checkbox"
                @click="CalculatePrice(order.check, order.total)"
                v-model.trim="order.check"
              />
              <i
                class="fa-solid fa-trash-can"
                id="cancel-btn"
                @click="RemoveOrder(index)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="check-frame" v-if="showFade">
        <div class="total-price">
          <span style="color: #272727">總計: </span>
          ${{ totalPrice }}
        </div>
        <div class="checkout-btn" @click="ClickBuy">結帳</div>
      </div>
    </transition>
  </div>

  <div class="overlay" v-show="showCheck" @click="showCheck = false"></div>
  <transition name="slide-check">
    <CheckOrder class="check-page" v-if="showCheck" />
  </transition>

  <transition name="slide-check">
    <LoadingEle v-if="showLoader" />
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";
import CheckOrder from "./CheckOrder.vue";
import ErrorMessage from "./ErrorMessage.vue";
import { errorText, errorType } from "../components/LoginPage.vue";
import {
  showErrorMsg,
  showCheck,
  showLoader,
} from "../components/CheckOrder.vue";
import LoadingEle from "./LoadingEle.vue";

export const buyList = ref({});

export default {
  name: "CartPage",
  components: {
    CheckOrder,
    ErrorMessage,
    LoadingEle,
  },
  setup() {
    const dishAmount = ref(0);
    const showFade = ref(false);
    const showSlide = ref(false);
    const filteredData = ref({});
    const check = ref(false);
    const totalPrice = ref(0);
    const selectAllClick = ref(false);

    const CountDishAmount = (operator, index) => {
      const order = filteredData.value[index];

      if (operator === "+") {
        order.amount += 1;

        if (order.check) {
          totalPrice.value += order.price;
        }
      } else if (operator === "-" && order.amount > 1) {
        order.amount -= 1;

        if (order.check) {
          totalPrice.value -= order.price;
        }
      }

      order.total = order.price * order.amount;
    };

    const GetOrderData = async () => {
      const response = await fetch(`http://localhost:3000/api/get-orders`);
      const data = await response.json();

      const userMail = localStorage.getItem("userEmail");

      filteredData.value = data.filter((order) => order.email === userMail);

      console.log(filteredData.value);
    };

    const ClickBuy = () => {
      buyList.value = filteredData.value.filter(
        (order) => order.check === true
      );

      if (buyList.value.length === 0) {
        errorText.value = "請選擇商品進行結帳!";
        errorType.value = true;

        showErrorMsg.value = true;

        setTimeout(() => {
          showErrorMsg.value = false;
        }, 2000);
      } else {
        showCheck.value = true;
      }
    };

    const CalculatePrice = (check, price) => {
      if (check) {
        totalPrice.value -= price;
      } else {
        totalPrice.value += price;
      }
    };

    const EmpltCart = () => {
      if (filteredData.value.length === 0) {
        errorText.value = "購物車是空的!";
        errorType.value = true;

        showErrorMsg.value = true;

        const cartEle = document.querySelector(".cart-page");
        cartEle.style.height = "72vh";

        const btnEle = document.querySelector(".clean-btn");
        btnEle.style.color = "#ffffff";
        btnEle.style.backgroundColor = "#ffea9d";
        btnEle.style.cursor = "not-allowed";
      } else {
        showErrorMsg.value = false;
      }

      if (filteredData.value.length === 1) {
        const cartEle = document.querySelector(".cart-page");
        cartEle.style.height = "72vh";
      }
    };

    const RemoveOrder = async (index) => {
      const response = await fetch(`http://localhost:3000/api/remove-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list: [filteredData.value[index]._id],
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      errorText.value = "餐點刪除成功!";
      errorType.value = false;
      showErrorMsg.value = true;

      setTimeout(() => {
        showErrorMsg.value = false;

        showLoader.value = true;
        window.location.reload();
      }, 2000);
    };

    const RemoveAllOrder = async () => {
      if (filteredData.value.length === 0) {
        return;
      }

      const removeList = filteredData.value.map((item) => item._id);

      const response = await fetch(`http://localhost:3000/api/remove-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list: removeList,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      errorText.value = "餐點已全數刪除!";
      errorType.value = false;
      showErrorMsg.value = true;

      showLoader.value = true;

      setTimeout(() => {
        showErrorMsg.value = false;

        window.location.reload();
      }, 2000);
    };

    const SelectAll = () => {
      selectAllClick.value = !selectAllClick.value;

      if (selectAllClick.value) {
        for (const item of filteredData.value) {
          item.check = true;

          totalPrice.value += item.price;
        }
      } else {
        for (const item of filteredData.value) {
          item.check = false;
        }
      }
    };

    onMounted(async () => {
      showFade.value = true;
      showSlide.value = true;

      showLoader.value = false;

      await GetOrderData();

      EmpltCart();
    });

    return {
      errorText,
      errorType,
      showErrorMsg,
      showCheck,
      showLoader,
      dishAmount,
      showFade,
      showSlide,
      filteredData,
      check,
      buyList,
      totalPrice,
      selectAllClick,
      CountDishAmount,
      GetOrderData,
      ClickBuy,
      CalculatePrice,
      EmpltCart,
      RemoveOrder,
      RemoveAllOrder,
      SelectAll,
    };
  },
};
</script>

<style scoped>
.cart-page {
  height: 100%;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: relative;
}
.error-msg {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 2;
}
.title {
  color: #f0c42d;
  font-size: 35px;
  font-weight: bold;
  margin: 20px 0;
  margin-bottom: 50px;
}
.top-btn-frame {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 80px;
  right: calc(10% - 20px);
}
.all-btn,
.clean-btn {
  width: 100px;
  height: 40px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  background-color: #f0c42d;
  border-radius: 20px;
  transition: all 0.3s ease;
}
.all-btn {
  margin-right: 20px;
}
.all-btn:hover,
.clean-btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
}
.active {
  color: #272727;
  background-color: #ffea9d;
}
.box-frame,
.dish-box-outframe {
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
#cancel-btn {
  color: #f0c42d;
  font-size: 26px;
  margin-top: 15px;
}
#cancel-btn:hover {
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
  bottom: 0;
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

.check-page {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
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
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
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
  transform: translateX(20px);
}
.x-slide-enter-to,
.x-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
