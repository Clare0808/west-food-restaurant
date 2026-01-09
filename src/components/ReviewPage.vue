<template>
  <div class="review-page">
    <transition name="x-slide">
      <ErrorMessage class="error-msg" v-show="showErrorMsg" />
    </transition>
    <transition name="fade">
      <div class="title" v-if="showFade">顧客回饋</div>
    </transition>
    <transition name="slide">
      <div class="review-box-frame" v-if="showSlide">
        <div v-for="re in reviewData" :key="re">
          <div class="review-box">
            <div class="review-stars">
              <div v-for="i in re.stars" :key="i">
                <i class="fa-solid fa-star"></i>
              </div>
            </div>
            <div class="review-content">{{ re.content }}</div>
            <div class="review-author-info">
              <i class="fa-solid fa-user"></i>
              <div class="review-text-frame">
                <div class="review-author-name">{{ re.name }}</div>
                <div class="review-author-date">{{ re.date }}</div>
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

  <transition name="slide-loader">
    <LoadingEle v-if="showLoader" />
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";
import WriteReview from "./WriteReview.vue";
import { errorText, errorType } from "../components/LoginPage.vue";
import {
  showErrorMsg,
  showWriteReview,
  showLoader,
} from "../components/WriteReview.vue";
import ErrorMessage from "./ErrorMessage.vue";
import LoadingEle from "./LoadingEle.vue";

export default {
  name: "ReviewPage",
  components: {
    WriteReview,
    ErrorMessage,
    LoadingEle,
  },
  setup() {
    const showSlide = ref(false);
    const showFade = ref(false);
    const reviewData = ref(false);

    const GetReview = async () => {
      const response = await fetch(`http://localhost:3000/api/get-review`);
      const data = await response.json();

      reviewData.value = data;
    };

    onMounted(async () => {
      showSlide.value = true;
      showFade.value = true;

      showLoader.value = false;

      await GetReview();
    });

    return {
      errorText,
      errorType,
      showErrorMsg,
      showWriteReview,
      showLoader,
      showSlide,
      showFade,
      reviewData,
      GetReview,
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
.error-msg {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 2;
}
.title {
  color: #f0c42d;
  font-size: 35px;
  font-weight: bold;
  margin: 20px 0;
}
.review-box-frame {
  display: grid;
  grid-template-columns: repeat(3, 350px);
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
