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
            <i class="fa-solid fa-pencil" @click="HandleModify(index)"></i>
            <i class="fa-solid fa-trash-can" @click="ShowCheckEle(index)"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="overlay" v-if="showModify" @click="showModify = false"></div>
    <transition name="slide-child">
      <ModifyOrder class="modify-ele" v-if="showModify" />
    </transition>

    <div class="overlay" v-if="showOption" @click="showOption = false"></div>
    <transition name="slide-child">
      <DishOption class="dish-option" v-if="showOption" />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import { errorUiStore } from "@/store/error";

import ModifyOrder from "./ModifyOrder.vue";
import DishOption from "./DishOption.vue";

import {
  removeData,
  showCheckEle,
} from "../../components/backstage/ReviewPage.vue";

export const showModify = ref(false);
export const modifyList = ref({});
export const showOption = ref(false);
export const selectedOption = ref("");

export default {
  name: "BackOrder",
  components: {
    ModifyOrder,
    DishOption,
  },
  setup() {
    const orderData = ref([]);

    const errorStore = errorUiStore();

    const GetOrderData = async () => {
      const userMail = localStorage.getItem("userEmail");

      const responseOrder = await fetch(
        `http://localhost:3000/api/get-buy-orders`
      );
      const dataOrder = await responseOrder.json();

      const responseUser = await fetch(`http://localhost:3000/api/send-data`);
      const dataUser = await responseUser.json();

      orderData.value = dataOrder;

      if (orderData.value.length === 0) {
        errorStore.SetError("尚無訂單!");
        errorStore.CloseEle();
      }

      for (const item of orderData.value) {
        item.name = dataUser.filter((i) => i.email === userMail)[0].name;
        item.phone = dataUser.filter((i) => i.email === userMail)[0].number;
      }
    };

    const ShowCheckEle = (index) => {
      showCheckEle.value = true;

      removeData.value.type = "order";
      removeData.value.list = [orderData.value[index]._id];
    };

    const HandleModify = (index) => {
      showModify.value = true;

      modifyList.value = orderData.value[index];
    };

    onMounted(async () => {
      await GetOrderData();
    });

    return {
      removeData,
      showCheckEle,
      showModify,
      showOption,
      selectedOption,
      modifyList,
      orderData,
      GetOrderData,
      ShowCheckEle,
      HandleModify,
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.modify-ele,
.dish-option {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.dish-option {
  z-index: 3;
}

.slide-child-enter-active,
.slide-child-leave-active {
  transition: all 1s ease;
}
.slide-child-enter-from,
.slide-child-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(20px);
}
.slide-child-enter-to,
.slide-child-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
}
</style>
