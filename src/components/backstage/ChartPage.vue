<template>
  <div class="back-chart">
    <div class="container">
      <div class="option-frame">
        <div class="sec-title" @click="HandleCanvas('sold')">餐點銷量</div>
        <div class="sec-title" @click="HandleCanvas('star')">顧客評價</div>
        <div class="sec-title" @click="HandleCanvas('revenue')">營業額</div>
      </div>
      <div class="data-flame">
        <transition name="fade">
          <canvas ref="amountCanvas" v-show="showSold"></canvas>
        </transition>
        <transition name="fade">
          <canvas ref="reviewCanvas" v-show="showStar"></canvas>
        </transition>
        <transition name="fade">
          <canvas ref="revenueCanvas" v-show="showRevenue"></canvas>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables); // 註冊 Chart.js

export default {
  name: "BackChart",
  setup() {
    const dishSold = ref([]);
    const amountCanvas = ref(null);
    const reviewData = ref([]);
    const reviewCanvas = ref(null);
    const revenueData = ref([]);
    const revenueCanvas = ref(null);

    const showSold = ref(false);
    const showStar = ref(false);
    const showRevenue = ref(false);

    const GetDishSold = async () => {
      const responseMenu = await fetch("/data/dishData.json");
      const dataMenu = await responseMenu.json();

      for (const dish of dataMenu) {
        const tempList = {};

        tempList.name = dish.name;
        tempList.amount = 0;

        dishSold.value.push(tempList);
      }

      const responseOrder = await fetch(`/api/get-buy-orders`);
      const dataOrder = await responseOrder.json();

      for (const sold of dishSold.value) {
        for (const order of dataOrder) {
          for (const item of order.list) {
            if (item.name === sold.name) {
              sold.amount += item.amount;
            }
          }
        }
      }
    };

    const GetReviewData = async () => {
      const response = await fetch(`/api/get-review`);
      const data = await response.json();

      for (let i = 1; i <= 5; i++) {
        const tempList = {};

        tempList.label = String(i);
        tempList.amount = 0;

        reviewData.value.push(tempList);
      }

      for (const review of data) {
        for (const item of reviewData.value) {
          if (review.stars === Number(item.label)) {
            item.amount += 1;
          }
        }
      }
    };

    const GetRevenueData = async () => {
      const response = await fetch(`/api/get-buy-orders`);
      const data = await response.json();

      for (const item of data) {
        const tempTime = item.date.substring(0, 7);

        let existing = revenueData.value.find(
          (item) => item.time.substring(0, 7) === tempTime
        );

        if (existing) {
          existing.total += item.total;
        } else {
          revenueData.value.push({ time: tempTime, total: item.total });
        }
      }
    };

    const HandleCanvas = async (type) => {
      if (type === "sold") {
        showSold.value = true;
        showStar.value = false;
        showRevenue.value = false;
      } else if (type === "star") {
        showSold.value = false;
        showStar.value = true;
        showRevenue.value = false;
      } else if (type === "revenue") {
        showSold.value = false;
        showStar.value = false;
        showRevenue.value = true;
      }
    };

    onMounted(async () => {
      await GetDishSold();
      new Chart(amountCanvas.value, {
        type: "bar",
        data: {
          labels: dishSold.value.map((item) => item.name),
          datasets: [
            {
              label: "Amount",
              data: dishSold.value.map((item) => item.amount),
              backgroundColor: "#ffea9d",
            },
          ],
        },
        options: {
          responsive: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1, // 每格間距為 1，確保都是整數
              },
            },
          },
        },
      });

      await GetReviewData();
      new Chart(reviewCanvas.value, {
        type: "bar",
        data: {
          labels: reviewData.value.map((item) => item.label),
          datasets: [
            {
              label: "Amount",
              data: reviewData.value.map((item) => item.amount),
              backgroundColor: "#ffea9d",
            },
          ],
        },
        options: {
          responsive: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1, // 每格間距為 1，確保都是整數
              },
            },
          },
        },
      });

      await GetRevenueData();
      new Chart(revenueCanvas.value, {
        type: "line",
        data: {
          labels: revenueData.value.map((item) => item.time),
          datasets: [
            {
              label: "Amount",
              data: revenueData.value.map((item) => item.total),
              backgroundColor: "#f0c42d",
              borderColor: "#ffea9d",
            },
          ],
        },
        options: {
          responsive: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 10, // 每格間距為 1，確保都是整數
              },
            },
          },
        },
      });
    });

    return {
      dishSold,
      amountCanvas,
      reviewData,
      reviewCanvas,
      revenueData,
      revenueCanvas,
      showSold,
      showStar,
      showRevenue,
      GetDishSold,
      GetReviewData,
      GetRevenueData,
      HandleCanvas,
    };
  },
};
</script>

<style scoped>
.back-chart {
  width: calc(100% - 290px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.option-frame {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sec-title {
  width: 100px;
  color: #f0c42d;
  font-size: 20px;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  margin: 20px;
  padding: 10px;
  transition: all 0.3s ease;
}
.sec-title:hover {
  color: #272727;
  background-color: #ffea9d;
  border: 1px solid #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
canvas {
  width: 900px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s ease;
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
