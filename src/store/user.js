import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null, // 刷新頁面仍保持登入狀態
    isAuthenticated: !!localStorage.getItem("token"), // 轉化成布林值
  }),
  actions: {
    async signup(userData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/signup",
          userData
        );
        this.user = response.data.user;
        this.isAuthenticated = true;
      } catch (error) {
        // 後端回傳的錯誤訊息
        const msg = error.response?.data?.message || "註冊失敗";
        throw new Error(msg);
      }
    },
    async login(credentials) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/login",
          credentials
        );
        this.user = response.data.user;
        this.token = response.data.token;
        this.isAuthenticated = true;

        localStorage.setItem("token", this.token);
      } catch (error) {
        const msg = error.response?.data?.message || "登入失敗";
        throw new Error(msg);
      }
    },
    async googleLogin() {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          withCredentials: true,
        });

        this.user = response.data;
        this.token = response.token;
        this.isAuthenticated = true;

        localStorage.setItem("token", this.token);
      } catch (error) {
        const msg = error.response?.data?.message || "登入失敗";
        throw new Error(msg);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");

      axios.get("http://localhost:3000/api/logout", { withCredentials: true });
    },
    async init(loginUser) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/now-login",
          { email: loginUser }
        );

        this.user = response.data.user;
        return this.user;
      } catch (error) {
        const msg = error.response?.data?.message || "初始化失敗";
        throw new Error(msg);
      }
    },
    async modifyUserData(id, column, data) {
      try {
        const response = await axios.patch(
          "http://localhost:3000/api/modify-data",
          { id: id, column: column, data: data }
        );

        this.user = response.data;
        return this.user;
      } catch (error) {
        const msg = error.response?.data?.message || "初始化失敗";
        throw new Error(msg);
      }
    },
  },
  getters: {
    isAdmin: (state) => state.user?.role === "admin",
    isUser: (state) => state.user?.role === "user",
  },
});
