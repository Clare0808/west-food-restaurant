<template>
  <div class="login-page">
    <transition name="x-slide">
      <ErrorMessage class="error-msg" v-show="showError" />
    </transition>
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
import ErrorMessage from "./ErrorMessage.vue";

export const errorText = ref("");
export const errorType = ref(false);
export const loginStatus = ref(false);

export default {
  name: "LoginPage",
  components: {
    ErrorMessage,
  },
  setup() {
    const showLogin = ref(false);
    const showSignUp = ref(false);
    const showError = ref(false);

    const email = ref("");
    const name = ref("");
    const number = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const router = useRouter();

    const ClickChangeType = () => {
      showLogin.value = !showLogin.value;
      showSignUp.value = !showSignUp.value;

      CleanInput();
    };

    const ClickLogin = async () => {
      ExamInputFrame();

      if (!errorType.value) {
        await CheckLoginData();

        if (!errorType.value) {
          errorText.value = "登入成功!";
          showError.value = true;

          localStorage.setItem("userEmail", email.value);
          localStorage.setItem("userName", name.value);

          CleanInput();

          setTimeout(() => {
            router.push("/");

            loginStatus.value = true;
          }, 2000);
        }
      }

      setTimeout(() => {
        showError.value = false;
      }, 2000);
    };

    const ClickSignUp = async () => {
      ExamInputFrame();

      if (!errorType.value) {
        await ExamEmail();

        if (!errorType.value) {
          errorText.value = "註冊成功!";
          showError.value = true;

          const response = await fetch(`http://localhost:3000/api/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.value,
              name: name.value,
              number: number.value,
              password: password.value,
            }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          CleanInput();

          setTimeout(() => {
            ClickChangeType();
          }, 2000);
        }
      }

      setTimeout(() => {
        showError.value = false;
      }, 2000);
    };

    const CleanInput = () => {
      email.value = "";
      name.value = "";
      number.value = "";
      password.value = "";
      confirmPassword.value = "";
    };

    const ExamInputFrame = () => {
      errorType.value = true;
      showError.value = true;

      if (email.value === "") {
        errorText.value = "請輸入E-mail!";
      } else if (name.value === "" && showSignUp.value) {
        errorText.value = "請輸入名稱!";
      } else if (number.value === "" && showSignUp.value) {
        errorText.value = "請輸入電話號碼!";
      } else if (password.value === "") {
        errorText.value = "請輸入密碼!";
      } else if (confirmPassword.value === "" && showSignUp.value) {
        errorText.value = "請再次輸入密碼!";
      } else if (password.value !== confirmPassword.value && showSignUp.value) {
        errorText.value = "密碼與確認密碼不相符!";
      } else {
        errorType.value = false;
        showError.value = false;
      }
    };

    const ExamEmail = async () => {
      const response = await fetch(`http://localhost:3000/api/send-data`);
      const data = await response.json();

      for (const item of data) {
        if (item.email === email.value) {
          errorText.value = "該E-mail已存在!";
          errorType.value = true;
          showError.value = true;

          return;
        }
      }

      errorType.value = false;
      showError.value = false;
    };

    const CheckLoginData = async () => {
      const response = await fetch(`http://localhost:3000/api/send-data`);
      const data = await response.json();

      let found = false;

      for (const item of data) {
        if (item.email === email.value) {
          found = true;

          if (item.password === password.value) {
            errorType.value = false;
          } else {
            errorText.value = "密碼錯誤!";
            errorType.value = true;
            showError.value = true;
          }
          return;
        }
      }

      if (!found) {
        errorText.value = "該E-mail不存在!";
        errorType.value = true;
        showError.value = true;

        return;
      }

      errorType.value = false;
      showError.value = false;
    };

    onMounted(() => {
      showLogin.value = true;
    });

    return {
      errorText,
      errorType,
      loginStatus,
      showLogin,
      showSignUp,
      showError,
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
      ExamEmail,
      CheckLoginData,
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
.error-msg {
  position: absolute;
  top: 0;
  right: 20px;
  z-index: 2;
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
</style>
