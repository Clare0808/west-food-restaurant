<template>
  <div class="review-page">
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
    <transition name="slide">
      <div class="non-content" v-if="showNonContent">快留下第一則評論!</div>
    </transition>
    <transition name="fade">
      <div class="add-btn" @click="ClickAdd" v-if="showFade">+</div>
    </transition>

    <i
      class="fa-regular fa-circle-question"
      id="help-btn"
      @click="showReviewGuide = true"
    ></i>

    <div
      class="overlay"
      v-show="showWriteReview"
      @click="showWriteReview = false"
    ></div>
    <transition name="slide-write-review">
      <WriteReview class="write-review" v-show="showWriteReview" />
    </transition>
  </div>

  <div class="overlay" @click="CloseGuide" v-if="showReviewGuide"></div>
  <transition name="slide-guide">
    <ReviewGuide class="review-guide" v-if="showReviewGuide" />
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";

import { useUserStore } from "@/store/user";
import { errorUiStore } from "@/store/error";

import WriteReview from "./WriteReview.vue";
import ReviewGuide from "../components/guide/reviewClick.vue";

import { showWriteReview } from "../components/WriteReview.vue";
import { showMobile } from "../App.vue";

export default {
  name: "ReviewPage",
  components: {
    WriteReview,
    ReviewGuide,
  },
  setup() {
    const showSlide = ref(false);
    const showFade = ref(false);
    const reviewData = ref(false);
    const showNonContent = ref(false);
    const showReviewGuide = ref(false);

    const router = useRouter();
    const userStore = useUserStore();
    const errorStore = errorUiStore();

    const GetReview = async () => {
      const response = await fetch(`http://localhost:3000/api/get-review`);
      const data = await response.json();

      reviewData.value = data;
    };

    const ExamPage = () => {
      if (reviewData.value.length == 0) {
        showNonContent.value = true;

        const reviewEle = document.querySelector(".review-page");
        reviewEle.style.height = "80vh";
      } else if (reviewData.value.length <= 6) {
        const reviewEle = document.querySelector(".review-page");
        reviewEle.style.height = "80vh";
      }
    };

    const ClickAdd = async () => {
      if (userStore.isAuthenticated) {
        showWriteReview.value = true;
      } else {
        errorStore.LoadError("請先登入帳號!");

        await errorStore.CloseLoadEle();
        router.push("/login");
      }
    };

    const HandleGuide = async () => {
      const userMail = localStorage.getItem("userEmail");

      const responseData = await userStore.init(userMail);

      if (!responseData.reviewClicked) {
        showReviewGuide.value = true;
      }
    };

    const CloseGuide = async () => {
      const userMail = localStorage.getItem("userEmail");

      const responseData = await userStore.init(userMail);

      if (showReviewGuide.value) {
        showReviewGuide.value = false;

        userStore.modifyUserData(responseData.id, "reviewClicked", true);
      }
    };

    onMounted(async () => {
      showSlide.value = true;
      showFade.value = true;

      showMobile.value = false;

      await GetReview();

      ExamPage();

      await HandleGuide();
    });

    return {
      showWriteReview,
      showMobile,
      showSlide,
      showFade,
      reviewData,
      showNonContent,
      showReviewGuide,
      GetReview,
      ExamPage,
      ClickAdd,
      HandleGuide,
      CloseGuide,
    };
  },
};
</script>

<style scoped>
.review-page {
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: start;
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
.non-content {
  font-size: 30px;
  margin-top: 100px;
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
  position: fixed;
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
#help-btn {
  font-size: 26px;
  color: #f0c42d;
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 2;
  cursor: pointer;
}

.write-review,
.review-guide {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 98;
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
.slide-guide-enter-active,
.slide-guide-leave-active {
  transition: all 1s ease;
}
.slide-guide-enter-from,
.slide-guide-leave-to {
  opacity: 0;
  transform: translateX(-100%) translate(-50%, -50%);
}
.slide-guide-enter-to,
.slide-guide-leave-from {
  opacity: 1;
  transform: translateX(0) translate(-50%, -50%);
}

@media (max-width: 1130px) {
  .review-box-frame {
    grid-template-columns: repeat(2, 350px);
  }
}
@media (max-width: 760px) {
  .review-box-frame {
    grid-template-columns: 330px;
  }
}
</style>
