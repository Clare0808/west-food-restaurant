<template>
  <div class="order-guide">
    <div class="title">頁面導覽</div>
    <div class="dish-box">
      <img src="@/assets/images/homepage4.png" />
      <div class="info-frame">
        <div class="dish-info">
          <div class="dish-name">好吃牛肉麵</div>
          <div class="num-frame">
            <div class="num-btn">-</div>
            <div class="dish-amount">x3</div>
            <div class="num-btn">+</div>
          </div>
        </div>
        <div class="dish-total-price">$200</div>
      </div>
      <div class="btn-frame">
        <input class="checkbox" type="checkbox" />
        <i class="fa-solid fa-trash-can" id="cancel-btn"></i>
        <i class="fa-solid fa-arrow-pointer" id="pointer"></i>
      </div>
    </div>
    <div class="sec-title">記得勾選餐點後再結帳!</div>
  </div>
</template>

<style scoped>
.order-guide {
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
.dish-box {
  width: 80%;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  margin: 20px 0;
  padding: 20px;
  display: flex;
  justify-content: start;
  align-items: center;
}
img {
  width: 120px;
}
.info-frame {
  width: 100%;
  border-right: 1px solid #f0c42d;
  border-left: 1px solid #f0c42d;
  margin: 0 20px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.dish-info {
  width: 100%;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.num-frame {
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.num-btn {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #f0c42d;
  border-radius: 20px;
  transition: all 0.3s ease;
}
.dish-amount {
  margin: 0 20px;
}
.dish-total-price {
  width: 100%;
  color: #f0c42d;
  font-size: 26px;
  font-weight: bold;
  text-align: end;
  margin-top: 20px;
}
.btn-frame {
  position: relative;
}
.checkbox {
  appearance: none; /* 移除預設樣式 */
  width: 25px;
  height: 25px;
  border: 1px solid #f0c42d;
  border-radius: 5px;
}
#cancel-btn {
  color: #f0c42d;
  font-size: 26px;
  margin-top: 15px;
}
#pointer {
  color: #d0d0d0;
  font-size: 35px;
  position: absolute;
  bottom: 30px;
  right: 0px;
  animation: movePointer 1.5s infinite alternate;
}
.sec-title {
  font-size: 22px;
  color: #272727;
  margin-top: 20px;
}

@keyframes movePointer {
  from {
    color: #272727;
    transform: translateX(0px) translateY(0px);
  }
  to {
    transform: translateX(40px) translateY(40px);
  }
}

@media (max-width: 950px) {
  .dish-box {
    flex-direction: column;
  }
  .info-frame {
    margin-top: 20px;
    padding: 10px;
    border: none;
  }
  .dish-info {
    display: block;
  }
  .dish-name {
    text-align: start;
  }
  .num-frame {
    justify-content: end;
    margin-top: 10px;
  }
  .dish-total-price {
    margin-top: 10px;
  }
  .btn-frame {
    display: flex;
    flex-direction: row-reverse;
  }
  .checkout-btn {
    width: 100px;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    margin: 0 20px;
  }
  #cancel-btn {
    margin: 0 20px;
  }
  #pointer {
    font-size: 25px;
    bottom: -10px;
    right: 0px;
  }
}
</style>
