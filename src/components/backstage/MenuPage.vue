<template>
  <div class="back-menu">
    <div class="dish-box-outframe">
      <div class="dish-box-frame" v-for="dish in dishList" :key="dish">
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
            <i class="fa-solid fa-pencil"></i>
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>
      </div>
      <div class="add-btn">新增餐點 +</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import DishData from "../../assets/data/dishData.json";

export default {
  name: "BackMenu",
  setup() {
    const dishList = ref();

    onMounted(() => {
      dishList.value = DishData;
    });

    return {
      DishData,
      dishList,
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
</style>
