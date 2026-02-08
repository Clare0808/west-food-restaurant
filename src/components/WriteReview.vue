<template>
  <div class="write-review">
    <div class="title">評論填寫</div>
    <div class="write-content">
      <div class="sec-title">評分：</div>
      <div class="stars-frame">
        <div v-for="i in 5" :key="i">
          <i
            class="fa-solid fa-star"
            @mouseenter="HandleStarTouch(i)"
            @mouseleave="HandleStarLeave()"
            @click="ClickStart(i)"
            :class="{ starTouch: starTouch[i - 1] }"
          ></i>
        </div>
      </div>
    </div>
    <div class="write-content">
      <div class="sec-title">寫下你的評論吧!</div>
      <textarea type="text" v-model.trim="reviewContent"></textarea>
    </div>
    <div class="btn-frame">
      <div class="cancel-btn" @click="showWriteReview = false">取消</div>
      <div class="submit-btn" @click="SendReview">提交</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { errorUiStore } from "@/store/error";

export const showWriteReview = ref(false);

export default {
  setup() {
    const starTouch = ref(Array(5).fill(false));
    const starClick = ref(0);
    const reviewContent = ref("");
    const reviewDate = ref("");
    const userName = ref("");

    const errorStore = errorUiStore();

    const HandleStarTouch = (index) => {
      for (let i = 0; i < 5; i++) {
        starTouch.value[i] = i < index;
      }
    };

    const HandleStarLeave = () => {
      for (let i = 0; i < 5; i++) {
        starTouch.value[i] = i < starClick.value;
      }
    };

    const ClickStart = (index) => {
      starClick.value = index;

      for (let i = 0; i < 5; i++) {
        starTouch.value[i] = i < index;
      }
    };

    const SendReview = async () => {
      CreateDate();

      const response = await fetch(`/api/send-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName.value,
          stars: starClick.value,
          content: reviewContent.value,
          date: reviewDate.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      showWriteReview.value = false;

      errorStore.LoadSuccess("已成功送出評論!");

      await errorStore.CloseLoadEle();
      window.location.reload();
    };

    const CreateDate = () => {
      const date = new Date();

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      reviewDate.value = year + "-" + month + "-" + day;
    };

    const GetUserInfo = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/send-data`
      );
      const data = await response.json();

      const userMail = localStorage.getItem("userEmail");

      userName.value = data.filter((info) => info.email === userMail)[0].name;
    };

    return {
      showWriteReview,
      starTouch,
      starClick,
      reviewContent,
      reviewDate,
      userName,
      HandleStarTouch,
      HandleStarLeave,
      ClickStart,
      SendReview,
      CreateDate,
      GetUserInfo,
    };
  },
};
</script>

<style scoped>
.write-review {
  width: 65%;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #f0c42d;
  padding: 20px;
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
.write-content {
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.sec-title {
  font-size: 22px;
}
.stars-frame {
  display: flex;
  justify-content: center;
  align-items: start;
}
.stars-frame i {
  color: #ffea9d;
  font-size: 28px;
  margin: 10px 10px;
  transition: all 0.3s ease;
}
.stars-frame i:hover {
  color: #f0c42d;
  cursor: pointer;
  transform: scale(1.2);
}
.stars-frame i.starTouch {
  color: #f0c42d;
}
textarea {
  width: calc(100% - 20px);
  font-size: 20px;
  font-family: "Brush Script MT", cursive;
  margin-top: 10px;
  height: 150px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #adadad;
}
textarea:focus {
  outline: none;
  border: 1px solid #f0c42d;
}
.btn-frame {
  display: flex;
  justify-content: center;
  align-items: center;
}
.submit-btn,
.cancel-btn {
  width: 150px;
  height: 40px;
  font-size: 20px;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  margin: 20px 20px 0px 20px;
  transition: all 0.3s ease;
}
.submit-btn {
  color: #ffffff;
  background-color: #f0c42d;
}
.cancel-btn {
  background-color: #ffffff;
  border: 1px solid #f0c42d;
}
.submit-btn:hover,
.cancel-btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
.cancel-btn:hover {
  border: 1px solid #ffea9d;
}

@media (max-width: 540px) {
  .title {
    font-size: 30px;
  }
  .submit-btn,
  .cancel-btn {
    width: 100px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
  }
}
</style>
