<template>
  <div class="back-review">
    <div class="review-box-outframe">
      <div class="review-box-frame" v-for="review in reviewData" :key="review">
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
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "BackReview",
  setup() {
    const reviewData = ref(false);

    const GetReview = async () => {
      const response = await fetch(`http://localhost:3000/api/get-review`);
      const data = await response.json();

      reviewData.value = data;
    };

    onMounted(async () => {
      await GetReview();
    });

    return {
      reviewData,
      GetReview,
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
i {
  color: #f0c42d;
  margin: 10px 0;
}
i:hover {
  color: #272727;
  cursor: pointer;
}
</style>
