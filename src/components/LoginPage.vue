<template>
  <div class="login-page">
    <transition name="slide">
      <div class="func-box" v-if="showLogin">
        <div class="title">登入</div>
        <div class="input-frame">
          <div class="sec-title">E-mail</div>
          <input type="text" v-model.trim="email" />
        </div>
        <div class="input-frame">
          <div class="sec-title">密碼</div>
          <input type="password" v-model.trim="password" />
        </div>
        <div class="btn-frame">
          <div class="sign-up-btn" @click="ClickChangeType()">註冊</div>
          <div class="login-btn" @click="ClickLogin">登入</div>
        </div>
      </div>
    </transition>
    <transition name="slide">
      <div class="func-box" v-if="showSignUp">
        <div class="title">註冊</div>
        <div class="input-frame">
          <div class="sec-title">E-mail</div>
          <input type="text" v-model.trim="email" />
        </div>
        <div class="input-frame-mix">
          <div class="input-frame">
            <div class="sec-title">名稱</div>
            <input type="text" v-model.trim="name" />
          </div>
          <div class="input-frame">
            <div class="sec-title">電話號碼</div>
            <input type="text" v-model.trim="number" />
          </div>
        </div>
        <div class="input-frame">
          <div class="sec-title">密碼</div>
          <input type="password" v-model.trim="password" />
        </div>
        <div class="input-frame">
          <div class="sec-title">確認密碼</div>
          <input type="password" v-model.trim="confirmPassword" />
        </div>
        <div class="btn-frame">
          <div class="sign-up-btn" @click="ClickChangeType()">登入</div>
          <div class="login-btn" @click="ClickSignUp">註冊</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/store/user";
import { errorUiStore } from "@/store/error";

import { showMobile, showMobileMenu } from "../App.vue";

export default {
  name: "LoginPage",
  setup() {
    const showLogin = ref(false);
    const showSignUp = ref(false);

    const email = ref("");
    const name = ref("");
    const number = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const router = useRouter();
    const userStore = useUserStore();
    const errorStore = errorUiStore();

    const ClickChangeType = () => {
      showLogin.value = !showLogin.value;
      showSignUp.value = !showSignUp.value;

      CleanInput();
    };

    const ClickLogin = async () => {
      ExamInputFrame();

      if (!errorStore.errorType) {
        try {
          if (!errorStore.errorType) {
            await userStore.login({
              email: email.value,
              password: password.value,
            });

            if (userStore.isAuthenticated) {
              errorStore.LoadSuccess("登入成功!");

              localStorage.setItem("userEmail", email.value);
              localStorage.setItem("userName", name.value);
              localStorage.setItem("inAdmin", userStore.isAdmin);

              CleanInput();

              await errorStore.CloseLoadEle();
              router.push("/");
            }
          }
        } catch (err) {
          errorStore.SetError(err.message);
        }
      }

      errorStore.CloseEle();
    };

    const ClickSignUp = async () => {
      ExamInputFrame();

      if (!errorStore.errorType) {
        try {
          if (!errorStore.errorType) {
            errorStore.SetSuccess("註冊成功!");

            await userStore.signup({
              email: email.value,
              name: name.value,
              number: number.value,
              password: password.value,
            });

            CleanInput();

            setTimeout(() => {
              ClickChangeType();
            }, 2000);
          }
        } catch (err) {
          errorStore.SetError(err.message);
        }
      }

      errorStore.CloseEle();
    };

    const CleanInput = () => {
      email.value = "";
      name.value = "";
      number.value = "";
      password.value = "";
      confirmPassword.value = "";
    };

    const ExamInputFrame = () => {
      if (email.value === "") {
        errorStore.SetError("請輸入E-mail!");
      } else if (name.value === "" && showSignUp.value) {
        errorStore.SetError("請輸入名稱!");
      } else if (number.value === "" && showSignUp.value) {
        errorStore.SetError("請輸入電話號碼!");
      } else if (password.value === "") {
        errorStore.SetError("請輸入密碼!");
      } else if (confirmPassword.value === "" && showSignUp.value) {
        errorStore.SetError("請再次輸入密碼!");
      } else if (password.value !== confirmPassword.value && showSignUp.value) {
        errorStore.SetError("密碼與確認密碼不相符!");
      } else {
        errorStore.errorType = false;
        errorStore.showErrorMsg = false;
      }
    };

    onMounted(() => {
      showLogin.value = true;

      showMobile.value = false;
      showMobileMenu.value = true;
    });

    return {
      showMobile,
      showMobileMenu,
      showLogin,
      showSignUp,
      email,
      name,
      number,
      password,
      confirmPassword,
      ClickChangeType,
      ClickLogin,
      ClickSignUp,
      CleanInput,
      ExamInputFrame,
    };
  },
};
</script>

<style scoped>
.login-page {
  height: 79vh;
  overflow: hidden;
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
  margin-bottom: 20px;
}
.func-box {
  width: 40%;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 0;
  transform: translate(-50%, -50%);
}
.input-frame {
  width: 100%;
  margin: 10px 0;
}
.input-frame-mix {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, calc(50% - 10px));
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.sec-title {
  font-size: 22px;
  text-align: start;
  margin: 5px 0;
}
input {
  width: 100%;
  height: 30px;
  border: 1px solid #ffffff;
  border-bottom: 1px solid #f0c42d;
}
input:focus {
  outline: none;
  border-bottom: 2px solid #f0c42d;
}
.btn-frame {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sign-up-btn,
.login-btn {
  width: 100px;
  height: 40px;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  margin: 0px 20px;
  margin-top: 10px;
  transition: all 0.3s ease;
}
.sign-up-btn {
  color: #272727;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
}
.sign-up-btn:hover {
  background-color: #ffea9d;
  border: 1px solid #ffea9d;
  cursor: pointer;
}
.login-btn {
  color: #ffffff;
  background-color: #f0c42d;
}
.login-btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(20px);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
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
</style>
