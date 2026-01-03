<template>
  <div class="error-msg" :class="{ error: errorType, success: !errorType }">
    <div class="text">{{ errorText }}</div>
  </div>
</template>

<script>
import { errorText, errorType } from "../components/LoginPage.vue";

export default {
  setup() {
    return {
      errorText,
      errorType,
    };
  },
};
</script>

<style scoped>
.error,
.success {
  width: 250px;
  height: 60px;
  font-size: 22px;
  border-radius: 20px;
  text-align: center;
  line-height: 60px;
}
.error {
  color: #ff2d2d;
  background-color: #ffb5b5;
}
.success {
  color: #00bb00;
  background-color: #93ff93;
}
</style>
