<template>
  <div class="back-contact">
    <div class="contact-box-outframe">
      <div
        class="contact-box-frame"
        v-for="(contact, index) in contactData"
        :key="index"
      >
        <div class="contact-box">
          <div class="text-outframe">
            <div class="text-frame">
              <div class="contact-stars">
                <div v-for="i in contact.stars" :key="i">
                  <i class="fa-solid fa-star"></i>
                </div>
              </div>
              <div class="contact-info">{{ contact.content }}</div>
            </div>
            <div class="text-frame">
              <div class="contact-info">{{ contact.name }}</div>
              <div class="contact-date">{{ contact.date }}</div>
            </div>
          </div>
          <div class="btn-frame">
            <i class="fa-solid fa-trash-can" @click="ShowCheckEle(index)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

import { errorUiStore } from "@/store/error";

import {
  removeData,
  showCheckEle,
} from "../../components/backstage/ReviewPage.vue";

export default {
  name: "BackContact",
  setup() {
    const contactData = ref([]);

    const errorStore = errorUiStore();

    const GetContact = async () => {
      const response = await fetch(`/api/get-contact`);
      const data = await response.json();

      contactData.value = data;

      if (contactData.value.length === 0) {
        errorStore.SetError("尚無聯絡內容!");
        errorStore.CloseEle();
      }
    };

    const ShowCheckEle = (index) => {
      showCheckEle.value = true;

      removeData.value.type = "contact";
      removeData.value.list = [contactData.value[index]._id];
    };

    onMounted(async () => {
      await GetContact();
    });

    return {
      removeData,
      showCheckEle,
      contactData,
      GetContact,
      ShowCheckEle,
    };
  },
};
</script>

<style scoped>
.back-contact {
  width: calc(100% - 290px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.contact-box-outframe {
  width: 95%;
  padding-right: 40px;
  overflow-y: auto;
}
.contact-box-frame {
  width: 100%;
}
.contact-box {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-outframe {
  width: 100%;
  font-size: 20px;
  border-right: 1px solid #f0c42d;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text-frame {
  width: 100%;
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.contact-stars {
  color: #f0c42d;
  font-size: 24px;
  display: flex;
  justify-content: start;
  align-items: center;
}
.contact-date {
  color: #9d9d9d;
}
.contact-info-box-outframe {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}
.contact-info-box-frame {
  width: 98%;
}
.btn-frame {
  margin-left: 20px;
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
