<template>
  <div class="add-menu">
    <div class="title">新增餐點</div>
    <div class="info-frame">
      <div class="img-frame">
        <img class="img" :src="tempImage" />
        <i
          class="fa-solid fa-cloud-arrow-up"
          id="cloud"
          @click.prevent="TriggleFileInput"
        ></i>
        <input
          type="file"
          @change="UploadImage"
          ref="fileInput"
          style="display: none"
        />
      </div>
      <div class="text-outframe">
        <div class="text-frame">
          <div class="sec-title">名稱</div>
          <input type="text" v-model.trim="name" />
        </div>
        <div class="text-frame">
          <div class="sec-title">類別</div>
          <input type="text" v-model.trim="type" />
        </div>
        <div class="text-frame">
          <div class="sec-title">金額</div>
          <input type="text" v-model.trim="price" />
        </div>
        <div class="text-frame">
          <div class="sec-title">簡介</div>
          <textarea type="text" v-model.trim="description"></textarea>
        </div>
      </div>
    </div>
    <div class="btn-frame">
      <div class="no-btn" @click="ClickCancel">取消</div>
      <div class="yes-btn" @click="SendAdd">確定</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import { errorUiStore } from "@/store/error";

import { showAdd } from "../../components/backstage/MenuPage.vue";

export default {
  setup() {
    const name = ref("");
    const type = ref("");
    const price = ref("");
    const description = ref("");
    const newId = ref("");

    const fileInput = ref(null);
    const tempImage = ref(null);

    const errorStore = errorUiStore();

    const SendAdd = async () => {
      ExamEmptyInput();

      if (!errorStore.errorType) {
        const response = await fetch(`http://localhost:3000/api/add-menu`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: newId.value,
            name: name.value,
            type: type.value,
            price: price.value,
            description: description.value,
            image: tempImage.value,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        showAdd.value = false;

        errorStore.LoadSuccess("餐點新增成功!");

        await errorStore.CloseLoadEle();
        window.location.reload();
      }

      errorStore.CloseEle();
    };

    const CleanInput = () => {
      name.value = "";
      type.value = "";
      price.value = "";
      description.value = "";
    };

    const TriggleFileInput = () => {
      fileInput.value.click();
    };

    const UploadImage = async (e) => {
      const fd = new FormData();

      fd.append("name", name.value);
      fd.append("type", type.value);
      fd.append("image", e.target.files[0]);

      const res = await fetch("http://localhost:3000/api/upload-img", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      tempImage.value = data.tempPath;

      ExamImage();
    };

    const ClickCancel = () => {
      showAdd.value = false;

      ExamImage();
    };

    const ExamEmptyInput = () => {
      if (name.value === "") {
        errorStore.SetError("餐點名稱尚未填入!");
      } else if (type.value === "") {
        errorStore.SetError("餐點類型尚未填入!");
      } else if (price.value === "") {
        errorStore.SetError("餐點價格尚未填入!");
      } else if (description.value === "") {
        errorStore.SetError("餐點簡介尚未填入!");
      } else if (!tempImage.value) {
        errorStore.SetError("餐點圖片尚未上傳!");
      } else {
        errorStore.errorType = false;
        errorStore.showErrorMsg = false;
      }
    };

    const ExamImage = () => {
      const imgEle = document.querySelector(".img");
      const cloudEle = document.querySelector("#cloud");

      if (!tempImage.value) {
        imgEle.style.display = "none";
        cloudEle.style.display = "block";
      } else {
        imgEle.style.display = "block";
        cloudEle.style.display = "none";
      }
    };

    const FindNewId = async () => {
      const response = await fetch("/data/dishData.json");
      const data = await response.json();

      let maxId = -1;

      data.forEach((item) => {
        if (item.id > maxId) {
          maxId = item.id;
        }
      });

      newId.value = maxId + 1;
    };

    onMounted(() => {
      CleanInput();

      ExamImage();

      FindNewId();
    });

    return {
      showAdd,
      name,
      type,
      price,
      description,
      newId,
      fileInput,
      tempImage,
      SendAdd,
      CleanInput,
      TriggleFileInput,
      UploadImage,
      ClickCancel,
      ExamEmptyInput,
      ExamImage,
      FindNewId,
    };
  },
};
</script>

<style scoped>
.add-menu {
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
.info-frame {
  display: grid;
  grid-template-columns: 30% 70%;
  justify-content: center;
  align-items: center;
}
.img-frame {
  width: 200px;
  height: 200px;
  border: 1px solid #ffea9d;
  border-radius: 20px;
  position: relative;
}
img {
  width: 200px;
  height: 200px;
}
#cloud {
  color: #f0c42d;
  font-size: 60px;
  position: absolute;
  bottom: 35%;
  right: 32%;
}
#cloud:hover {
  color: #ffea9d;
  cursor: pointer;
}
.text-frame {
  width: 100%;
  font-size: 20px;
  margin: 20px 0;
  display: flex;
  justify-content: start;
  align-items: center;
}
.sec-title {
  width: 100px;
}
input {
  width: 95%;
  font-size: 20px;
  font-family: "Brush Script MT", cursive;
  text-align: center;
  border: none;
  border-bottom: 1px solid #ffea9d;
  padding: 5px;
}
input:focus {
  outline: none;
  border-bottom: 1px solid #f0c42d;
}
textarea {
  width: 95%;
  font-size: 20px;
  font-family: "Brush Script MT", cursive;
  margin-top: 10px;
  height: 80px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ffea9d;
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
