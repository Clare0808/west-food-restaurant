<template>
  <div class="dish-option">
    <div class="title">請選擇</div>
    <div class="type-outframe">
      <div
        class="type-frame"
        v-for="(option, indexOp) in dishOption"
        :key="indexOp"
      >
        <div class="sec-title">{{ option.type }}</div>
        <div class="dish-outframe">
          <div
            class="dish-frame"
            v-for="(dish, indexD) in option.dish"
            :key="indexD"
          >
            <div class="dish-name" @click="SendOption(indexOp, indexD)">
              {{ dish }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import optionsDataRaw from "../../assets/data/optionsData.json";
import {
  showOption,
  selectedOption,
} from "../../components/backstage/OrderPage.vue";

export default {
  setup() {
    const dishData = ref([]);
    const optionData = ref([]);
    const dishOption = ref([]);

    const GetDishData = async () => {
      const response = await fetch("/data/dishData.json");
      const data = await response.json();

      dishData.value = data;
      optionData.value = optionsDataRaw;

      for (const option of optionData.value) {
        let tempList = {};
        let tempDishList = [];

        for (const dish of dishData.value) {
          if (option.label === dish.category) {
            tempDishList.push(dish.name);
          }
        }

        if (tempDishList.length !== 0) {
          tempList.type = option.name;
        }

        tempList.dish = tempDishList;

        dishOption.value.push(tempList);
      }
    };

    const SendOption = (indexOp, indexD) => {
      selectedOption.value = dishOption.value[indexOp].dish[indexD];

      if (selectedOption.value !== "") {
        showOption.value = false;
      }
    };

    onMounted(async () => {
      await GetDishData();
    });

    return {
      optionsDataRaw,
      showOption,
      selectedOption,
      dishData,
      optionData,
      dishOption,
      GetDishData,
      SendOption,
    };
  },
};
</script>

<style scoped>
.dish-option {
  width: 80%;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  color: #f0c42d;
  font-size: 24px;
  margin: 10px 0;
}
.type-outframe {
  max-height: 450px;
  overflow-y: auto;
  padding: 0 50px;
}
.sec-title {
  width: 100%;
  text-align: start;
  margin: 10px 0;
}
.dish-outframe {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
}
.dish-name {
  font-size: 18px;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  margin: 0 10px;
  padding: 10px;
  transition: all 0.3s ease;
}
.dish-name:hover {
  border: 1px solid #ffea9d;
  background-color: #ffea9d;
  cursor: pointer;
}
</style>
