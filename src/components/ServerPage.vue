<template>
  <div class="server-page">
    <transition name="fade">
      <div class="title" v-if="showFade">常見問題</div>
    </transition>
    <transition name="slide">
      <div class="box-outframe" v-if="showSlide">
        <div v-for="(question, index) in questionData" :key="index">
          <div class="box-frame">
            <div class="question-box">
              <div class="question">{{ question.question }}</div>
              <div class="icon" @click="HandleShowAnswer(index)">﹀</div>
            </div>
            <transition name="slide-down">
              <div class="answer-box" v-if="question.show">
                <div class="answer" v-html="question.answer"></div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </transition>
  </div>

  <i class="fa-regular fa-message" id="contact" @click="showContact = true"></i>

  <i
    class="fa-regular fa-circle-question"
    id="help-btn"
    @click="showServerGuide = true"
  ></i>

  <div class="overlay" v-show="showContact" @click="showContact = false"></div>
  <transition name="slide-contact">
    <ContactServer class="contact-ele" v-show="showContact" />
  </transition>

  <div class="overlay" @click="CloseGuide" v-if="showServerGuide"></div>
  <transition name="slide-guide">
    <ServerGuide class="server-guide" v-if="showServerGuide" />
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";

import { useUserStore } from "@/store/user";

import QuestionDataRaw from "../assets/data/questionData.json";
import ContactServer from "./ContactServer.vue";
import ServerGuide from "./guide/serverClick.vue";

import { showMobile } from "../App.vue";

export const showContact = ref(false);

export default {
  name: "ServerPage",
  components: {
    ContactServer,
    ServerGuide,
  },
  setup() {
    const questionData = ref(QuestionDataRaw);
    const showSlide = ref(false);
    const showFade = ref(false);
    const showServerGuide = ref(false);

    const userStore = useUserStore();

    const HandleShowAnswer = (index) => {
      questionData.value[index].show = !questionData.value[index].show;

      const queEle = document.querySelectorAll(".box-frame")[index];

      if (questionData.value[index].show) {
        if (window.innerWidth <= 500) {
          queEle.style.marginBottom = "140px";
        } else {
          queEle.style.marginBottom = "110px";
        }
      } else {
        queEle.style.marginBottom = "20px";
      }
    };

    const HandleGuide = async () => {
      const userMail = localStorage.getItem("userEmail");

      const responseData = await userStore.init(userMail);

      if (!responseData.serverClicked) {
        showServerGuide.value = true;
      }
    };

    const CloseGuide = async () => {
      const userMail = localStorage.getItem("userEmail");

      const responseData = await userStore.init(userMail);

      if (showServerGuide.value) {
        showServerGuide.value = false;

        userStore.modifyUserData(responseData.id, "serverClicked", true);
      }
    };

    onMounted(async () => {
      showSlide.value = true;
      showFade.value = true;

      showMobile.value = false;

      await HandleGuide();
    });

    return {
      QuestionDataRaw,
      showContact,
      showMobile,
      questionData,
      showSlide,
      showFade,
      showServerGuide,
      HandleShowAnswer,
      HandleGuide,
      CloseGuide,
    };
  },
};
</script>

<style scoped>
.server-page {
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
.box-outframe {
  width: 85%;
}
.box-frame {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}
.question-box {
  width: 95%;
  background-color: #ffea9d;
  border-radius: 20px;
  text-align: start;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}
.question {
  font-size: 22px;
}
.icon {
  color: #f0c42d;
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}
.icon:hover {
  color: #ffffff;
}
.answer-box {
  width: calc(95% - 2px);
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: start;
  padding: 20px;
  padding-top: 50px;
  position: absolute;
  top: 100px;
  transform: translate(0, -50%);
  z-index: 0;
}
.answer {
  font-size: 18px;
}

#contact {
  width: 60px;
  height: 60px;
  color: #ffffff;
  font-size: 26px;
  text-align: center;
  line-height: 60px;
  background-color: #f0c42d;
  border-radius: 50%;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 2;
  transition: all 0.3s ease;
}
#contact:hover {
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 98;
}
.contact-ele,
.server-guide {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
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
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.8s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px) translate(0, -50%);
}
.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0) translate(0, -50%);
}
.slide-contact-enter-active,
.slide-contact-leave-active {
  transition: all 1s ease;
}
.slide-contact-enter-from,
.slide-contact-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(20px);
}
.slide-contact-enter-to,
.slide-contact-leave-from {
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

@media (max-width: 500px) {
  .question-box {
    width: 90%;
  }
  .answer-box {
    width: calc(90% - 2px);
    top: 120px;
  }
}
</style>
