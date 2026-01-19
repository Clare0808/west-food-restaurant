<template>
  <div class="game-ele">
    <div class="title">小遊戲</div>
    <div class="outframe">
      <div v-for="(icon, index) in iconTypeList" :key="index">
        <div class="icon" @click="ClickFrame(index)">{{ icon }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    const clickTime = ref(0);
    const iconTypeList = ref(Array(9).fill(""));

    const ClickFrame = (index) => {
      clickTime.value += 1;

      if (clickTime.value % 2 == 1) {
        iconTypeList.value[index] = "X";
      } else {
        iconTypeList.value[index] = "O";
      }
    };

    onMounted(() => {
      clickTime.value = 0;
    });

    return {
      clickTime,
      iconTypeList,
      ClickFrame,
    };
  },
};
</script>

<style scoped>
.game-ele {
  width: 65%;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #f0c42d;
  padding: 30px;
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
.outframe {
  display: grid;
  grid-template-columns: repeat(3, 120px);
  grid-template-rows: repeat(3, 120px);
}
.icon {
  width: 100%;
  height: 100%;
  font-size: 60px;
  font-weight: bold;
  font-family: "Segoe UI", Arial;
  text-align: center;
  line-height: 120px;
  border: 1px solid #f0c42d;
}
</style>
