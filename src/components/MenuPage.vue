<template>
  <div class="menu-page">
    <transition name="fade">
      <div class="title" v-if="showText">菜單 Menu</div>
    </transition>
    <transition name="slide">
      <div class="options-frame" v-if="showElement">
        <div v-for="(opt, index) in OptionsData" :key="index">
          <div
            class="option"
            @click="ClickOptions(opt)"
            :class="{ active: opt.click }"
          >
            {{ opt.name }}
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="dish-box-frame" v-if="showElement">
        <div
          class="dish-frame"
          v-for="(dish, index) in filteredList"
          :key="index"
          @click="ClickDish(dish)"
        >
          <img :src="dish.image" />
          <div class="dish-info-frame">
            <div class="dish-name">{{ dish.name }}</div>
            <div class="dish-price">${{ dish.price }}</div>
          </div>
        </div>
      </div>
    </transition>

    <div
      class="overlay"
      v-show="showOrderPage"
      @click="showOrderPage = false"
    ></div>
    <transition name="slide-order">
      <OrderDish class="order-page" v-show="showOrderPage" />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import DishData from "../assets/data/dishData.json";
import OptionsDataRaw from "../assets/data/optionsData.json";
import OrderDish from "./OrderDish.vue";
import { dishAmount } from "../components/OrderDish.vue";

export const orderList = ref({});

export default {
  name: "MenuPage",
  components: {
    OrderDish,
  },
  setup() {
    const filteredList = ref([]);
    const showOrderPage = ref(false);
    const showText = ref(false);
    const showElement = ref(false);
    const OptionsData = ref(OptionsDataRaw); // 修正成 reactive 狀態

    const ClickOptions = (opt) => {
      filteredList.value = DishData.filter((data) => {
        return data.category === opt.label;
      });

      opt.click = true;

      OptionsData.value.forEach((data) => {
        if (data.label !== opt.label) {
          data.click = false;
        }
      });

      if (opt.label === "all") {
        filteredList.value = DishData;
        opt.click = true;

        OptionsData.value.forEach((data) => {
          if (data.label !== "all") {
            data.click = false;
          }
        });
      }
    };

    const ClickDish = (data) => {
      showOrderPage.value = true;

      orderList.value.name = data.name;
      orderList.value.description = data.description;
      orderList.value.price = data.price;
      orderList.value.image = data.image;

      dishAmount.value = 1;
    };

    onMounted(() => {
      showText.value = true;
      showElement.value = true;

      filteredList.value = DishData;

      OptionsData.value.forEach((data) => {
        if (data.label === "all") {
          data.click = true;
        }
      });
    });

    return {
      DishData,
      OptionsDataRaw,
      OptionsData,
      orderList,
      filteredList,
      showOrderPage,
      showText,
      showElement,
      ClickOptions,
      ClickDish,
    };
  },
};
</script>

<style scoped>
.menu-page {
  padding-bottom: 50px;
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
.options-frame {
  display: flex;
  justify-content: center;
  align-items: center;
}
.option {
  width: 80px;
  color: #272727;
  font-size: 20px;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  margin: 10px;
  padding: 10px;
  transition: all 0.3s ease;
}
.option:hover {
  color: #ffffff;
  background-color: #f0c42d;
  cursor: pointer;
}
.active {
  color: #ffffff;
  background-color: #f0c42d;
}
.dish-box-frame {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-template-rows: auto;
  justify-content: center;
  align-items: center;
}
.dish-frame {
  width: 300px;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  margin: 20px 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}
.dish-frame:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.dish-frame img {
  width: 250px;
}
.dish-info-frame {
  width: 100%;
  font-size: 24px;
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid #f0c42d;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dish-price {
  color: #f0c42d;
}

.order-page {
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
.slide-order-enter-active,
.slide-order-leave-active {
  transition: all 1s ease;
}
.slide-order-enter-from,
.slide-order-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(20px);
}
.slide-order-enter-to,
.slide-order-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
}
</style>
