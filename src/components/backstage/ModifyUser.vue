<template>
  <div class="modify-user">
    <div class="title">修改身份</div>
    <div class="modify-box">
      <div class="info-box">
        <div class="sec-title">用戶名稱</div>
        <div class="user-info">{{ modifyUser.user }}</div>
      </div>
      <div class="info-box-role">
        <div class="sec-title">身份選擇</div>
        <div class="selector" @click="showOption = !showOption">
          {{ selectedOption }}
        </div>
        <div class="role-select" v-show="showOption">
          <div class="role-option" @click="ClickOption('admin')">管理者</div>
          <div class="role-option" @click="ClickOption('user')">使用者</div>
        </div>
      </div>
    </div>
    <div class="btn-frame">
      <div class="no-btn" @click="ClickCancel">取消</div>
      <div class="yes-btn" @click="HandleModify">確定</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { showModify, modifyUser } from "./UserPage.vue";
import { errorText, errorType } from "../../components/LoginPage.vue";
import {
  showErrorMsg,
  showLoader,
} from "../../components/backstage/ReviewPage.vue";

export default {
  setup() {
    const showOption = ref(false);
    const selectedOption = ref("");

    const HandleModify = async () => {
      let roleType = selectedOption.value;

      if (roleType === "管理者") {
        roleType = "admin";
      } else if (roleType === "使用者") {
        roleType = "user";
      }

      if (roleType === modifyUser.value.role) {
        errorText.value = "資料未修改!";
        errorType.value = true;

        showErrorMsg.value = true;

        setTimeout(() => {
          showErrorMsg.value = false;
        }, 2000);
      } else {
        const response = await fetch(`http://localhost:3000/api/modify-data`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: modifyUser.value.id,
            column: "role",
            data: roleType,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        errorText.value = "資料修改成功!";
        errorType.value = false;
        showErrorMsg.value = true;

        showModify.value = false;
        showLoader.value = true;

        setTimeout(() => {
          showErrorMsg.value = false;

          window.location.reload();
        }, 2000);
      }
    };

    const ClickOption = (role) => {
      if (role === "admin") {
        selectedOption.value = "管理者";
      } else if (role === "user") {
        selectedOption.value = "使用者";
      }

      showOption.value = false;

      const roleEle = document.querySelector(".selector");
      roleEle.style.backgroundColor = "#ffea9d";
      roleEle.style.border = "1px solid #ffea9d";
    };

    const ClickCancel = () => {
      showModify.value = false;
    };

    onMounted(() => {
      if (modifyUser.value.role === "admin") {
        selectedOption.value = "管理者";
      } else if (modifyUser.value.role === "user") {
        selectedOption.value = "使用者";
      }
    });

    return {
      showOption,
      modifyUser,
      errorText,
      errorType,
      showErrorMsg,
      showLoader,
      selectedOption,
      HandleModify,
      ClickOption,
      ClickCancel,
    };
  },
};
</script>

<style scoped>
.modify-user {
  width: 65%;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  padding: 20px;
}
.title {
  color: #f0c42d;
  font-size: 35px;
  font-weight: bold;
  margin: 20px 0;
}
.modify-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info-box,
.info-box-role {
  width: 95%;
  font-size: 20px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info-box-role {
  position: relative;
}
.selector {
  width: 120px;
  height: 40px;
  font-size: 18px;
  font-family: "Brush Script MT", cursive;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
}
.selector:hover {
  cursor: pointer;
}
.role-select {
  width: 120px;
  border: 1px solid #f0c42d;
  border-top: none;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-top: 10px;
  position: absolute;
  top: 65px;
  right: calc(0% - 60px);
  transform: translate(-50%, -50%);
}
.role-option {
  font-size: 18px;
  margin: 5px 0;
}
.role-option:hover {
  background-color: #ffea9d;
  border-radius: 20px;
  cursor: pointer;
}
.btn-frame {
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-btn,
.yes-btn {
  width: 150px;
  height: 40px;
  font-size: 20px;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  margin: 20px 20px 0px 20px;
  transition: all 0.3s ease;
}
.no-btn {
  background-color: #ffffff;
  border: 1px solid #f0c42d;
}
.yes-btn {
  color: #ffffff;
  background-color: #f0c42d;
}
.no-btn:hover,
.yes-btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
.no-btn:hover {
  border: 1px solid #ffea9d;
}
</style>
