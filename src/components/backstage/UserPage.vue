<template>
  <div class="back-user">
    <div class="info-outframe">
      <div class="info-frame" v-for="(user, index) in userList" :key="index">
        <div class="info-box">
          <div class="user-info">{{ user.name }}</div>
          <div class="user-info">{{ user.email }}</div>
          <div class="user-info">{{ user.number }}</div>
          <div class="user-info">{{ user.role }}</div>
        </div>
        <div class="btn-frame">
          <i class="fa-solid fa-pencil" @click="HandleModify(index)"></i>
          <i class="fa-solid fa-trash-can" @click="ShowCheckEle(index)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  removeData,
  showCheckEle,
} from "../../components/backstage/ReviewPage.vue";

export default {
  name: "BackUser",
  setup() {
    const userList = ref([]);

    const GetUserInfo = async () => {
      const response = await fetch(`http://localhost:3000/api/send-data`);
      const data = await response.json();

      userList.value = data;
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
      userList,
      GetUserInfo,
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
</style>
