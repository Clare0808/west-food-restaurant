<template>
  <div class="contact-ele">
    <div class="title">聯絡客服</div>
    <div class="contact-content">
      <div class="sec-title">寫下你的想說的話吧!</div>
      <textarea type="text" v-model.trim="content"></textarea>
    </div>
    <div class="btn-frame">
      <div class="cancel-btn" @click="showContact = false">取消</div>
      <div class="submit-btn" @click="SendContent">提交</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  showContact,
  showErrorMsg,
  showLoader,
} from "../components/ServerPage.vue";
import { errorText, errorType } from "../components/LoginPage.vue";

export default {
  setup() {
    const content = ref("");
    const userMail = ref("");
    const userName = ref("");
    const contentDate = ref("");

    const SendContent = async () => {
      CreateDate();

      const response = await fetch(`http://localhost:3000/api/send-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userMail.value,
          name: userName.value,
          content: content.value,
          date: contentDate.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      errorText.value = "成功送出線上客服表單!";
      errorType.value = false;
      showErrorMsg.value = true;

      showContact.value = false;
      showLoader.value = true;

      setTimeout(() => {
        showErrorMsg.value = false;

        window.location.reload();
      }, 2000);
    };

    const GetUserInfo = async () => {
      const response = await fetch(`http://localhost:3000/api/send-data`);
      const data = await response.json();

      userMail.value = localStorage.getItem("userEmail");

      if (userMail.value) {
        userName.value = data.filter(
          (info) => info.email === userMail.value
        )[0].name;
      }
    };

    const CreateDate = () => {
      const date = new Date();

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      contentDate.value = year + "-" + month + "-" + day;
    };

    onMounted(async () => {
      content.value = "";

      await GetUserInfo();
    });

    return {
      showContact,
      showErrorMsg,
      showLoader,
      errorText,
      errorType,
      content,
      userMail,
      userName,
      contentDate,
      SendContent,
      GetUserInfo,
      CreateDate,
    };
  },
};
</script>

<style scoped>
.contact-ele {
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
.contact-content {
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
