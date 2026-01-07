<template>
  <div class="user-page">
    <transition name="fade">
      <div class="title" v-if="showFade">使用者中心</div>
    </transition>
    <transition name="slide">
      <div class="info-frame" v-if="showSlide">
        <div class="user-info-frame">
          <div class="img-frame">
            <img src="@/assets/images/user.jpg" />
            <i class="fa-solid fa-pencil" id="pencil"></i>
          </div>
          <div class="user-info">
            王小名 先生
            <i class="fa-solid fa-pencil"></i>
          </div>
          <div class="user-info">66 點</div>
        </div>
        <div class="text-frame">
          <div class="func-outframe">
            <div class="func-frame">
              <div class="sec-title">點數紀錄</div>
              <div class="point-outframe">
                <div v-for="i in 10" :key="i">
                  <div class="point-frame">
                    <div class="point-date">2025-10-20</div>
                    <div class="point-info-frame">
                      <div class="point-info">消費金額 $175</div>
                      <div class="point-amount">+5點</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="func-frame">
              <div class="sec-title">訂餐紀錄</div>
              <div class="order-outframe">
                <div v-for="order in filteredData" :key="order">
                  <div class="order-frame">
                    <div class="order-code">{{ order.code }}</div>
                    <div class="order-date">{{ order.date }}</div>
                    <div
                      class="order-info-frame"
                      v-for="dish in order.list"
                      :key="dish"
                    >
                      <div class="order-info">
                        <div class="order-dish">{{ dish.name }}</div>
                        <div class="order-amount">x{{ dish.amount }}</div>
                      </div>
                    </div>
                    <div class="order-price">${{ order.total }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "UserPage",
  setup() {
    const showFade = ref(false);
    const showSlide = ref(false);
    const filteredData = ref({});

    const GetOrderData = async () => {
      const response = await fetch(`http://localhost:3000/api/get-buy-orders`);
      const data = await response.json();

      const userMail = localStorage.getItem("userEmail");

      filteredData.value = data.filter((order) => order.email === userMail);

      console.log(filteredData.value);
    };

    onMounted(async () => {
      showFade.value = true;
      showSlide.value = true;

      await GetOrderData();
    });

    return {
      showFade,
      showSlide,
      filteredData,
      GetOrderData,
    };
  },
};
</script>

<style scoped>
.user-page {
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
.info-frame {
  width: 80%;
  text-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-frame {
  position: relative;
}
img {
  width: 200px;
  height: 200px;
  border-bottom: 1px solid #f0c42d;
  margin-bottom: 20px;
  padding-bottom: 10px;
}
#pencil {
  width: 30px;
  height: 30px;
  color: #f0c42d;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  position: absolute;
  bottom: 50px;
  right: 10px;
}
#pencil:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
}
.user-info-frame {
  font-size: 24px;
  margin-right: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.user-info {
  width: 100%;
  text-align: start;
  margin: 5px 20px;
}
.user-info i {
  color: #f0c42d;
  font-size: 18px;
  margin-left: 20px;
}
.user-info i:hover {
  color: #272727;
  cursor: pointer;
}
.text-frame {
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  padding: 20px;
}
.func-outframe {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 20px));
  gap: 20px;
  justify-content: center;
  align-items: start;
}
.sec-title {
  color: #f0c42d;
  font-size: 22px;
}
.point-outframe,
.order-outframe {
  max-height: 350px;
  overflow-y: auto;
}
.point-frame,
.order-frame {
  margin-top: 10px;
  padding: 10px;
}
.point-date,
.order-date {
  color: #9d9d9d;
}
.point-info-frame,
.order-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.point-amount,
.order-price {
  color: #f0c42d;
}
.order-price {
  text-align: end;
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
</style>
