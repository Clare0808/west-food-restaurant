<template>
  <div class="modify-page">
    <div class="title">更改資料</div>
    <div class="modify-outframe">
      <div class="modify-frame">
        <div class="sec-title">原始</div>
        <div class="original-info">{{ userInfo }}</div>
      </div>
      <div class="modify-frame">
        <div class="sec-title">修改後</div>
        <input type="text" v-model.trim="modifyInfo" />
      </div>
    </div>
    <div class="btn" @click="HandleModify">確認送出</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { modifyColumn, showModify } from "../components/UserPage.vue";
import { errorText, errorType } from "../components/LoginPage.vue";

export const showErrorMsg = ref(false);
export const showLoader = ref(false);

export default {
  setup() {
    const modifyInfo = ref("");
    const userInfoId = ref("");
    const userInfo = ref("");

    const HandleModify = async () => {
      if (modifyInfo.value === "") {
        errorText.value = "請輸入新的資料!";
        errorType.value = true;
        showErrorMsg.value = true;

        setTimeout(() => {
          showErrorMsg.value = false;
        }, 2000);

        return;
      }

      const response = await fetch(`http://localhost:3000/api/modify-data`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfoId.value,
          column: modifyColumn.value,
          data: modifyInfo.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      errorText.value = "資料修改成功!";
      errorType.value = false;
      showErrorMsg.value = true;
      showModify.value = false;

      setTimeout(() => {
        showErrorMsg.value = false;

        showLoader.value = true;
        window.location.reload();
      }, 2000);
    };

    const FindUserInfoId = async () => {
      const response = await fetch(`http://localhost:3000/api/send-data`);
      const data = await response.json();

      const userMail = localStorage.getItem("userEmail");

      userInfoId.value = data.filter((item) => item.email === userMail)[0]._id;

      if (modifyColumn.value === "name") {
        userInfo.value = data.filter((item) => item.email === userMail)[0].name;
      } else {
        userInfo.value = data.filter(
          (item) => item.email === userMail
        )[0].number;
      }
    };

    onMounted(async () => {
      await FindUserInfoId();
    });

    return {
      modifyColumn,
      showModify,
      showErrorMsg,
      showLoader,
      modifyInfo,
      userInfoId,
      userInfo,
      HandleModify,
      FindUserInfoId,
    };
  },
};
</script>

<style scoped>
.modify-page {
  width: 65%;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #f0c42d;
  margin-bottom: 20px;
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
.modify-outframe {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 20px));
  gap: 40px;
}
.modify-frame {
  width: 100%;
}
.sec-title {
  font-size: 22px;
  text-align: start;
  margin: 5px 0;
}
.original-info,
input {
  width: 100%;
  height: 30px;
  font-size: 20px;
  font-family: "Brush Script MT", cursive;
  border: 1px solid #ffffff;
  border-bottom: 1px solid #f0c42d;
  text-align: center;
}
input:focus {
  outline: none;
  border-bottom: 2px solid #f0c42d;
}
.btn {
  width: 120px;
  height: 40px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  background-color: #f0c42d;
  border-radius: 20px;
  margin-top: 40px;
  transition: all 0.3s ease;
}
.btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
</style>
