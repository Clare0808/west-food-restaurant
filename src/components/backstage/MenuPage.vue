<template>
  <div class="back-menu">
    <div class="dish-box-outframe">
      <div
        class="dish-box-frame"
        v-for="(dish, index) in dishList"
        :key="index"
      >
        <div class="dish-box">
          <img :src="dish.image" />
          <div class="text-outframe">
            <div class="text-frame">
              <div class="dish-info">{{ dish.name }}</div>
              <div class="dish-info">{{ dish.category }}</div>
              <div class="dish-price">${{ dish.price }}</div>
            </div>
            <div class="dish-description">{{ dish.description }}</div>
          </div>
          <div class="btn-frame">
            <i class="fa-solid fa-pencil" @click="HandleModify(index)"></i>
            <i class="fa-solid fa-trash-can" @click="ShowCheckEle(index)"></i>
          </div>
        </div>
      </div>
      <div class="add-btn">新增餐點 +</div>
    </div>

    <div class="overlay" v-if="showModify" @click="showModify = false"></div>
    <transition name="slide-loader">
      <ModifyMenu class="modify-ele" v-if="showModify" />
    </transition>

    <transition name="x-slide">
      <ErrorMessage class="error-msg" v-show="showErrorMsg" />
    </transition>

    <transition name="slide-loader">
      <LoadingEle v-if="showLoader" />
    </transition>

    <div
      class="overlay"
      v-if="showCheckEle"
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
import ModifyMenu from "./ModifyMenu.vue";

export const showModify = ref(false);
export const modifyList = ref({});

export default {
  name: "BackMenu",
  components: {
    ErrorMessage,
    LoadingEle,
    CheckEle,
    ModifyMenu,
  },
  setup() {
    const dishList = ref([]);

    const GetDishData = async () => {
      const response = await fetch("/data/dishData.json");
      const data = await response.json();

      dishList.value = data;
    };

    const HandleModify = (index) => {
      showModify.value = true;

      modifyList.value = dishList.value[index];

      console.log(modifyList.value);
    };

    const ShowCheckEle = (index) => {
      showCheckEle.value = true;

      removeData.value.type = "menu";
      removeData.value.list = [dishList.value[index].id];

      console.log(removeData.value);
    };

    onMounted(async () => {
      await GetDishData();
    });

    return {
      errorText,
      errorType,
      removeData,
      showCheckEle,
      showErrorMsg,
      showLoader,
      showModify,
      modifyList,
      dishList,
      GetDishData,
      HandleModify,
      ShowCheckEle,
    };
  },
};
</script>

<style scoped>
.back-menu {
  width: calc(100% - 290px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.dish-box-outframe {
  width: 95%;
  padding-right: 40px;
  overflow-y: auto;
}
.dish-box-frame {
  width: 100%;
}
.dish-box {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 100px;
  height: 100px;
}
.text-outframe {
  width: 100%;
  font-size: 20px;
  text-align: start;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.text-frame {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dish-price {
  color: #f0c42d;
}
.dish-description {
  font-size: 18px;
}
.btn-frame {
  border-left: 1px solid #f0c42d;
  padding-left: 10px;
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
.add-btn {
  color: #f0c42d;
  font-size: 24px;
  margin: 20px;
}
.add-btn:hover {
  color: #272727;
  cursor: pointer;
}

.modify-ele {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
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
