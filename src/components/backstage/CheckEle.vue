<template>
  <div class="check-ele">
    <div class="title">是否刪除資料?</div>
    <div class="set-title">資料刪除後將無法復原!</div>
    <div class="btn-frame">
      <div class="no-btn" @click="showCheckEle = false">取消</div>
      <div class="yes-btn" @click="RemoveData">確定</div>
    </div>
  </div>
</template>

<script>
import {
  removeData,
  showCheckEle,
  showErrorMsg,
  showLoader,
} from "../../components/backstage/ReviewPage.vue";
import { errorText, errorType } from "../../components/LoginPage.vue";

export default {
  setup() {
    const RemoveData = async () => {
      const removeMap = {
        menu: "remove-menu",
        order: "remove-buy-orders",
        review: "remove-review",
        contact: "remove-contact",
      };
      const removeType = removeMap[removeData.value.type];

      const response = await fetch(`http://localhost:3000/api/${removeType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          list: removeData.value.list,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      errorText.value = "刪除成功!";
      errorType.value = false;
      showErrorMsg.value = true;

      showCheckEle.value = false;
      showLoader.value = true;

      setTimeout(() => {
        showErrorMsg.value = false;

        window.location.reload();
      }, 2000);
    };

    return {
      removeData,
      showCheckEle,
      showErrorMsg,
      showLoader,
      errorText,
      errorType,
      RemoveData,
    };
  },
};
</script>

<style scoped>
.check-ele {
  width: 65%;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  padding: 20px;
}
.title {
  font-size: 26px;
  margin-bottom: 10px;
}
.sec-title {
  font-size: 22px;
  margin-bottom: 20px;
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
