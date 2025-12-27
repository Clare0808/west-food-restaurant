<template>
  <div class="menu-page">
    <div class="title">菜單 Menu</div>
    <div class="options-frame">
      <div v-for="(opt, index) in optionsData" :key="index">
        <div class="option" @click="ClickOptions(opt.label)">
          {{ opt.name }}
        </div>
      </div>
    </div>
    <div class="dish-box-frame">
      <div class="dish-frame" v-for="(dish, index) in DishData" :key="index">
        <img :src="dish.image" />
        <div class="dish-info-frame">
          <div class="dish-name">{{ dish.name }}</div>
          <div class="dish-price">${{ dish.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DishData from "../assets/data/dishData.json";

export default {
  name: "MenuPage",
  setup() {
    const optionsData = [
      {
        name: "全部",
        label: "all",
      },
      {
        name: "飯食",
        label: "rice",
      },
      {
        name: "麵食",
        label: "noodle",
      },
      {
        name: "肉類",
        label: "meat",
      },
      {
        name: "湯品",
        label: "soup",
      },
      {
        name: "沙拉",
        label: "salad",
      },
      {
        name: "飲料",
        label: "drink",
      },
      {
        name: "甜點",
        label: "deserts",
      },
    ];

    const ClickOptions = (opt) => {
      console.log(opt);
    };

    return {
      DishData,
      optionsData,
      ClickOptions,
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
</style>
