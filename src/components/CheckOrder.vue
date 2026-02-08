<template>
  <div class="check-page">
    <div class="title">訂單確認</div>
    <div class="order-frame">
      <div class="sec-title">訂單標號</div>
      <div class="order-info">{{ orderCode }}</div>
    </div>
    <div class="order-frame">
      <div class="sec-title">訂餐時間</div>
      <div class="order-info">{{ orderTime }}</div>
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
    <div class="btn" @click="SendOrders">確認送出</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import { useUserStore } from "@/store/user";
import { errorUiStore } from "@/store/error";

import { buyList, showBuyGuide } from "../components/CartPage.vue";

export const showCheck = ref(false);

export default {
  setup() {
    const totalPrice = ref(0);
    const orderTime = ref("");
    const orderCode = ref("");
    const removeList = ref([]);

    const userStore = useUserStore();
    const errorStore = errorUiStore();

    const CalculatePrice = () => {
      for (const data of buyList.value) {
        totalPrice.value += data.total;
      }
    };

    const GetDate = () => {
      const date = new Date();

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      orderTime.value = `${year}-${month}-${day} ${hours}:${minutes}`;
      // orderTime.value = "2026-02-02 13:56";
    };

    const CreateOrderCode = () => {
      const date = new Date();

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      orderCode.value = "LSW" + year + month + day + hours + minutes;
    };

    const SendOrders = async () => {
      const response = await fetch(`/api/send-buy-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          list: buyList.value,
          total: totalPrice.value,
          code: orderCode.value,
          date: orderTime.value,
        }),
      });

      removeList.value = buyList.value.map((item) => item._id);

      await RemoveOrder();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      showCheck.value = false;

      errorStore.LoadSuccess("已成功送出訂單!");

      await errorStore.CloseLoadEle();
      window.location.reload();

      const userMail = localStorage.getItem("userEmail");

      const responseData = await userStore.init(userMail);

      if (!responseData.buyClicked) {
        localStorage.setItem("buyClicked", "true");

        localStorage.setItem("showBuyClickedGuide", "true");
      }
    };

    const RemoveOrder = async () => {
      const response = await fetch(`/api/remove-orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list: removeList.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    };

    onMounted(() => {
      CalculatePrice();

      GetDate();

      CreateOrderCode();
    });

    return {
      buyList,
      showBuyGuide,
      showCheck,
      totalPrice,
      orderTime,
      orderCode,
      removeList,
      CalculatePrice,
      GetDate,
      CreateOrderCode,
      SendOrders,
      RemoveOrder,
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

@media (max-width: 550px) {
  .title {
    font-size: 30px;
  }
  .order-frame {
    font-size: 18px;
  }
  .dish-frame {
    font-size: 16px;
  }
  .btn {
    width: 100px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
  }
}
@media (max-width: 400px) {
  .order-info {
    font-size: 16px;
  }
}
</style>
