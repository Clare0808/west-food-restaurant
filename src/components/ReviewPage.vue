<template>
  <div class="review-page">
    <transition name="fade">
      <div class="title" v-if="showFade">顧客回饋</div>
    </transition>
    <transition name="slide">
      <div class="review-box-frame" v-if="showSlide">
        <div v-for="i in 5" :key="i">
          <div class="review-box">
            <div class="review-stars">
              <div v-for="i in 5" :key="i">
                <i class="fa-solid fa-star"></i>
              </div>
            </div>
            <div class="review-content">食物非常美味，服務也很周到！</div>
            <div class="review-author-info">
              <i class="fa-solid fa-user"></i>
              <div class="review-text-frame">
                <div class="review-author-name">王小明</div>
                <div class="review-author-date">2024-05-15</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="add-btn" @click="showWriteReview = true" v-if="showFade">
        +
      </div>
    </transition>

    <div
      class="overlay"
      v-show="showWriteReview"
      @click="showWriteReview = false"
    ></div>
    <transition name="slide-write-review">
      <WriteReview class="write-review" v-show="showWriteReview" />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import WriteReview from "./WriteReview.vue";

export const showWriteReview = ref(false);

export default {
  name: "ReviewPage",
  components: {
    WriteReview,
  },
  setup() {
    const showSlide = ref(false);
    const showFade = ref(false);

    onMounted(() => {
      showSlide.value = true;
      showFade.value = true;
    });

    return {
      showWriteReview,
      showSlide,
      showFade,
    };
  },
};
</script>

<style scoped>
.review-page {
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
.review-box-frame {
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-template-rows: auto;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.review-box {
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  padding: 20px;
}
.review-stars {
  color: #f0c42d;
  font-size: 24px;
  display: flex;
  justify-content: start;
  align-items: center;
}
.review-content {
  font-size: 22px;
  margin: 20px 0;
  text-align: start;
}
.review-author-info {
  display: flex;
  justify-content: start;
  align-items: center;
}
.review-author-info i {
  font-size: 30px;
  margin-right: 20px;
}
.review-text-frame {
  font-size: 20px;
  text-align: start;
}
.add-btn {
  width: 60px;
  height: 60px;
  color: #ffffff;
  font-size: 40px;
  text-align: center;
  line-height: 60px;
  background-color: #f0c42d;
  border-radius: 50%;
  position: absolute;
  bottom: 30px;
  right: 30px;
  transition: all 0.3s ease;
}
.add-btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}

.write-review {
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
.slide-write-review-enter-active,
.slide-write-review-leave-active {
  transition: all 1s ease;
}
.slide-write-review-enter-from,
.slide-write-review-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(20px);
}
.slide-write-review-enter-to,
.slide-write-review-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
}
</style>
