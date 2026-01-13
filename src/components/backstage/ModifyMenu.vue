<template>
  <div class="modify-menu">
    <div class="title">修改資訊</div>
    <div class="info-frame">
      <div class="img-frame">
        <img :src="filteredData.image" />
        <i
          class="fa-solid fa-pencil"
          id="pencil"
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
          <input
            type="text"
            :placeholder="filteredData.name"
            v-model.trim="name"
          />
        </div>
        <div class="text-frame">
          <div class="sec-title">類別</div>
          <input
            type="text"
            :placeholder="filteredData.category"
            v-model.trim="type"
          />
        </div>
        <div class="text-frame">
          <div class="sec-title">金額</div>
          <input
            type="text"
            :placeholder="filteredData.price"
            v-model.trim="price"
          />
        </div>
        <div class="text-frame">
          <div class="sec-title">簡介</div>
          <textarea
            type="text"
            :placeholder="filteredData.description"
            v-model.trim="description"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="btn-frame">
      <div class="no-btn" @click="ClickCancel">取消</div>
      <div class="yes-btn" @click="SendModify">確定</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  showModify,
  modifyList,
} from "../../components/backstage/MenuPage.vue";
import { errorText, errorType } from "../../components/LoginPage.vue";
import {
  showErrorMsg,
  showLoader,
} from "../../components/backstage/ReviewPage.vue";

export default {
  setup() {
    const name = ref("");
    const type = ref("");
    const price = ref("");
    const description = ref("");

    const filteredData = ref({});

    const fileInput = ref(null);
    const tempImage = ref(null);

    const SendModify = async () => {
      const response = await fetch(`http://localhost:3000/api/modify-menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: filteredData.value.id,
          name: name.value,
          type: type.value,
          price: price.value,
          description: description.value,
          image: filteredData.value.image,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      errorText.value = "修改成功!";
      errorType.value = false;
      showErrorMsg.value = true;

      showModify.value = false;
      showLoader.value = true;

      setTimeout(() => {
        showErrorMsg.value = false;

        window.location.reload();
      }, 2000);
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

      if (name.value !== "") {
        fd.append("name", name.value);
      } else {
        fd.append("name", filteredData.value.name);
      }

      if (type.value !== "") {
        fd.append("type", type.value);
      } else {
        fd.append("type", filteredData.value.category);
      }

      fd.append("image", e.target.files[0]);

      const res = await fetch("http://localhost:3000/api/upload-img", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      tempImage.value = filteredData.value.image;
      filteredData.value.image = data.tempPath;
    };

    const ClickCancel = () => {
      showModify.value = false;

      filteredData.value.image = tempImage.value;
    };

    onMounted(() => {
      filteredData.value = modifyList.value;

      CleanInput();
    });

    return {
      showModify,
      modifyList,
      errorText,
      errorType,
      showErrorMsg,
      showLoader,
      name,
      type,
      price,
      description,
      filteredData,
      fileInput,
      tempImage,
      SendModify,
      CleanInput,
      TriggleFileInput,
      UploadImage,
      ClickCancel,
    };
  },
};
</script>

<style scoped>
.modify-menu {
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
  position: relative;
}
img {
  width: 200px;
  height: 200px;
}
#pencil {
  width: 30px;
  height: 30px;
  color: #ffffff;
  font-size: 16px;
  background-color: #ffea9d;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  position: absolute;
  bottom: 0px;
  right: 0px;
}
#pencil:hover {
  background-color: #f0c42d;
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
input::placeholder {
  font-size: 20px;
  font-family: "Brush Script MT", cursive;
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
