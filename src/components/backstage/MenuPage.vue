<template>
  <div class="back-menu">
    <div class="dish-box-outframe">
      <div class="dish-box-frame" v-for="i in 10" :key="i">
        <div class="dish-box">
          <img src="@/assets/images/homepage4.png" />
          <div class="text-outframe">
            <div class="text-frame">
              <div class="dish-info">無花果沙拉</div>
              <div class="dish-info">salad</div>
              <div class="dish-price">$180</div>
            </div>
            <div class="dish-description">
              精選牛排經過香煎，搭配濃郁的松露奶油醬，帶來奢華的口感享受。
            </div>
          </div>
          <div class="btn-frame">
            <i class="fa-solid fa-pencil"></i>
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>
      </div>
      <div class="add-btn">新增餐點 +</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackMenu",
};
</script>

<style scoped>
.back-menu {
  width: calc(100% - 290px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.dish-box-outframe {
  width: 95%;
  padding-right: 40px;
  overflow-y: auto;
}
.dish-box-frame {
  width: 100%;
}
.dish-box {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 100px;
  height: 100px;
}
.text-outframe {
  width: 100%;
  font-size: 20px;
  text-align: start;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.text-frame {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dish-price {
  color: #f0c42d;
}
.dish-description {
  font-size: 18px;
}
.btn-frame {
  border-left: 1px solid #f0c42d;
  padding-left: 10px;
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
.add-btn {
  color: #f0c42d;
  font-size: 24px;
  margin: 20px;
}
.add-btn:hover {
  color: #272727;
  cursor: pointer;
}
</style>
