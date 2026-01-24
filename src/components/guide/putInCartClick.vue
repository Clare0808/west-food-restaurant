<template>
  <div class="cart-guide">
    <div class="title">頁面導覽</div>
    <div class="box-frame">
      <i class="fa-solid fa-cart-shopping" id="cart"></i>
      <i class="fa-solid fa-user"></i>
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
    </div>
    <div class="sec-title">餐點可在購物車內查看!</div>
  </div>
</template>

<style scoped>
.cart-guide {
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
.box-frame {
  box-shadow: 0px 0px 3px 3px #d0d0d0;
  margin: 20px 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
}
.box-frame i {
  margin: 0 20px;
}
#cart {
  animation: shake 0.8s infinite alternate;
}
.sec-title {
  font-size: 22px;
  color: #272727;
  margin-top: 20px;
}

@keyframes shake {
  0% {
    transform: translateY(0px);
  }
  40% {
    transform: translateY(-10px) scale(1.4);
  }
  50% {
    transform: translateY(-10px) rotate(5deg) scale(1.4);
  }
  75% {
    transform: translateY(-10px) rotate(-5deg) scale(1.4);
  }
  100% {
    color: #f0c42d;
    transform: translateY(-10px) rotate(0deg) scale(1.4);
  }
}
</style>
