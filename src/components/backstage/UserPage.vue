<template>
  <div class="back-user">
    <div class="info-outframe">
      <div class="info-frame" v-for="(user, index) in userList" :key="index">
        <div class="info-box">
          <div class="user-info">{{ user.name }}</div>
          <div class="user-info">{{ user.email }}</div>
          <div class="user-info">{{ user.number }}</div>
          <div class="user-info">{{ GetRoleText(user.role) }}</div>
        </div>
        <div class="btn-frame">
          <i class="fa-solid fa-pencil" @click="HandleModify(index)"></i>
          <i class="fa-solid fa-trash-can" @click="ShowCheckEle(index)"></i>
        </div>
      </div>
    </div>

    <div class="overlay" v-if="showModify" @click="showModify = false"></div>
    <transition name="slide-child">
      <ModifyUser class="modify-ele" v-if="showModify" />
    </transition>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import ModifyUser from "./ModifyUser.vue";

import {
  removeData,
  showCheckEle,
} from "../../components/backstage/ReviewPage.vue";

export const showModify = ref(false);
export const modifyUser = ref({});

export default {
  name: "BackUser",
  components: {
    ModifyUser,
  },
  setup() {
    const userList = ref([]);

    const GetUserInfo = async () => {
      const response = await fetch(`/api/send-data`);
      const data = await response.json();

      userList.value = data;
    };

    const GetRoleText = (role) => {
      if (role === "admin") return "管理者";
      if (role === "user") return "使用者";
    };

    const HandleModify = (index) => {
      showModify.value = true;

      modifyUser.value.id = userList.value[index]._id;
      modifyUser.value.user = userList.value[index].name;
      modifyUser.value.role = userList.value[index].role;
    };

    const ShowCheckEle = (index) => {
      showCheckEle.value = true;

      removeData.value.type = "user";
      removeData.value.list = [userList.value[index]._id];
    };

    onMounted(async () => {
      await GetUserInfo();
    });

    return {
      showModify,
      userList,
      GetUserInfo,
      GetRoleText,
      HandleModify,
      ShowCheckEle,
    };
  },
};
</script>

<style scoped>
.back-user {
  width: calc(100% - 290px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.info-outframe {
  width: 95%;
  padding-right: 40px;
  overflow-y: auto;
}
.info-frame {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
}
.info-box {
  width: 100%;
  text-align: start;
  margin: 10px 0;
  display: grid;
  grid-template-columns: 20% 35% 20% 20%;
  gap: 20px;
  justify-content: start;
  align-items: center;
}
.user-info {
  font-size: 20px;
}
.btn-frame {
  border-left: 1px solid #f0c42d;
  margin: 10px 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.btn-frame i {
  color: #f0c42d;
  margin: 10px 0;
}
.btn-frame i:hover {
  color: #272727;
  cursor: pointer;
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
.modify-ele {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.slide-child-enter-active,
.slide-child-leave-active {
  transition: all 1s ease;
}
.slide-child-enter-from,
.slide-child-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) translateY(20px);
}
.slide-child-enter-to,
.slide-child-leave-from {
  opacity: 1;
  transform: translate(-50%, -50%) translateY(0);
}
</style>
