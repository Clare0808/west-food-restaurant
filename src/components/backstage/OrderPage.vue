<template>
  <div class="back-order">
    <div class="order-box-outframe">
      <div
        class="order-box-frame"
        v-for="(order, index) in orderData"
        :key="index"
      >
        <div class="order-box">
          <div class="text-outframe">
            <div class="text-frame">
              <div class="order-info">{{ order.code }}</div>
              <div class="order-date">{{ order.date }}</div>
            </div>
            <div class="text-frame">
              <div class="order-info">{{ order.name }}</div>
              <div class="order-info">{{ order.email }}</div>
              <div class="order-info">{{ order.phone }}</div>
            </div>
            <div class="order-info-box-outframe">
              <div
                class="order-info-box-frame"
                v-for="(list, index) in order.list"
                :key="index"
              >
                <div class="text-frame">
                  <div class="order-info">{{ list.name }}</div>
                  <div class="order-info">x{{ list.amount }}</div>
                </div>
              </div>
            </div>
            <div class="order-price">${{ order.total }}</div>
          </div>
          <div class="btn-frame">
            <i class="fa-solid fa-pencil"></i>
            <i class="fa-solid fa-trash-can" @click="ShowCheckEle(index)"></i>
          </div>
        </div>
      </div>
    </div>

    <transition name="x-slide">
      <ErrorMessage class="error-msg" v-show="showErrorMsg" />
    </transition>

    <transition name="slide-loader">
      <LoadingEle v-if="showLoader" />
    </transition>

    <div
      class="overlay"
      v-show="showCheckEle"
      @click="showCheckEle = false"
    ></div>
    <transition name="slide-loader">
      <CheckEle class="check-ele" v-if="showCheckEle" />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ErrorMessage from "../../components/ErrorMessage.vue";
import { errorText, errorType } from "../../components/LoginPage.vue";
import LoadingEle from "../../components/LoadingEle.vue";
import CheckEle from "./CheckEle.vue";
import {
  removeData,
  showCheckEle,
  showErrorMsg,
  showLoader,
} from "../../components/backstage/ReviewPage.vue";

export default {
  name: "BackOrder",
  components: {
    ErrorMessage,
    LoadingEle,
    CheckEle,
  },
  setup() {
    const orderData = ref([]);

    const GetOrderData = async () => {
      const userMail = localStorage.getItem("userEmail");

      const responseOrder = await fetch(
        `http://localhost:3000/api/get-buy-orders`
      );
      const dataOrder = await responseOrder.json();

      const responseUser = await fetch(`http://localhost:3000/api/send-data`);
      const dataUser = await responseUser.json();

      orderData.value = dataOrder;

      for (const item of orderData.value) {
        item.name = dataUser.filter((i) => i.email === userMail)[0].name;
        item.phone = dataUser.filter((i) => i.email === userMail)[0].number;
      }

      console.log(orderData.value);
    };

    const ShowCheckEle = (index) => {
      showCheckEle.value = true;

      removeData.value.type = "order";
      removeData.value.list = [orderData.value[index]._id];
    };

    onMounted(async () => {
      await GetOrderData();
    });

    return {
      errorText,
      errorType,
      removeData,
      showCheckEle,
      showErrorMsg,
      showLoader,
      orderData,
      GetOrderData,
      ShowCheckEle,
    };
  },
};
</script>

<style scoped>
.back-order {
  width: calc(100% - 290px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.order-box-outframe {
  width: 95%;
  padding-right: 40px;
  overflow-y: auto;
}
.order-box-frame {
  width: 100%;
}
.order-box {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-outframe {
  width: 100%;
  font-size: 20px;
  border-right: 1px solid #f0c42d;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text-frame {
  width: 100%;
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-date {
  color: #9d9d9d;
}
.order-info-box-outframe {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}
.order-info-box-frame {
  width: 98%;
}
.order-price {
  width: 100%;
  color: #f0c42d;
  text-align: end;
}
.btn-frame {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
i {
  color: #f0c42d;
  margin: 10px 0;
}
i:hover {
  color: #272727;
  cursor: pointer;
}

.error-msg {
  position: fixed;
  top: 20px;
  right: 20px;
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
.check-ele {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
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
.slide-loader-enter-active,
.slide-loader-leave-active {
  transition: all 1s ease;
}
.slide-loader-enter-from,
.slide-loader-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(20px);
}
.slide-loader-enter-to,
.slide-loader-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
}
</style>
