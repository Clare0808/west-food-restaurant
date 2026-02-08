<template>
  <div class="back-review">
    <div class="review-box-outframe">
      <div
        class="review-box-frame"
        v-for="(review, index) in reviewData"
        :key="index"
      >
        <div class="review-box">
          <div class="text-outframe">
            <div class="text-frame">
              <div class="review-stars">
                <div v-for="i in review.stars" :key="i">
                  <i class="fa-solid fa-star"></i>
                </div>
              </div>
              <div class="review-info">{{ review.content }}</div>
            </div>
            <div class="text-frame">
              <div class="review-info">{{ review.name }}</div>
              <div class="review-date">{{ review.date }}</div>
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

export const removeData = ref({});
export const showCheckEle = ref(false);
export const showErrorMsg = ref(false);
export const showLoader = ref(false);

export default {
  name: "BackReview",
  setup() {
    const reviewData = ref([]);

    const errorStore = errorUiStore();

    const GetReview = async () => {
      const response = await fetch(`/api/get-review`);
      const data = await response.json();

      reviewData.value = data;

      if (reviewData.value.length === 0) {
        errorStore.SetError("尚無評論!");
        errorStore.CloseEle();
      }
    };

    const ShowCheckEle = (index) => {
      showCheckEle.value = true;

      removeData.value.type = "review";
      removeData.value.list = [reviewData.value[index]._id];
    };

    onMounted(async () => {
      await GetReview();
    });

    return {
      removeData,
      showCheckEle,
      showErrorMsg,
      showLoader,
      reviewData,
      GetReview,
      ShowCheckEle,
    };
  },
};
</script>

<style scoped>
.back-review {
  width: calc(100% - 290px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.review-box-outframe {
  width: 95%;
  padding-right: 40px;
  overflow-y: auto;
}
.review-box-frame {
  width: 100%;
}
.review-box {
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
.review-stars {
  color: #f0c42d;
  font-size: 24px;
  display: flex;
  justify-content: start;
  align-items: center;
}
.review-date {
  color: #9d9d9d;
}
.review-info-box-outframe {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}
.review-info-box-frame {
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
