<template>
  <div class="dish-guide">
    <div class="title">頁面導覽</div>
    <div class="dish-box-frame">
      <div class="dish-frame">
        <img src="@/assets/images/homepage4.png" />
        <div class="dish-info-frame">
          <div class="dish-name">noodle</div>
          <div class="dish-price">$12.99</div>
        </div>
        <i class="fa-solid fa-arrow-pointer" id="pointer"></i>
      </div>
    </div>
    <div class="sec-title">點擊餐點可查看詳細資訊!</div>
  </div>
</template>

<style scoped>
.dish-guide {
  width: 65%;
  background-color: #ffffff;
  border-radius: 20px;
  border: 1px solid #f0c42d;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  color: #f0c42d;
  font-size: 35px;
  font-weight: bold;
  margin: 20px 0;
}
.dish-frame {
  width: 300px;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  box-shadow: 0px 0px 3px 3px #d0d0d0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}
.dish-frame img {
  width: 250px;
}
.dish-info-frame {
  width: 100%;
  font-size: 24px;
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid #f0c42d;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dish-price {
  color: #f0c42d;
}
#pointer {
  color: #f0c42d;
  font-size: 35px;
  position: absolute;
  bottom: 80px;
  right: 30px;
  animation: movePointer 1.5s infinite alternate;
}
.sec-title {
  font-size: 22px;
  color: #272727;
  margin-top: 20px;
}

@keyframes movePointer {
  from {
    color: #ffea9d;
    transform: translateX(0) translateY(0);
  }
  to {
    transform: translateX(40px) translateY(40px);
  }
}
</style>
