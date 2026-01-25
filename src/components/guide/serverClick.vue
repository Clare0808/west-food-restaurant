<template>
  <div class="server-guide">
    <div class="title">頁面導覽</div>
    <div class="box-frame">
      <i class="fa-regular fa-message" id="contact"></i>
      <i class="fa-solid fa-arrow-pointer" id="pointer"></i>
    </div>
    <div class="sec-title">點擊右下角對話框可填寫線上客服表單!</div>
  </div>
</template>

<style scoped>
.server-guide {
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
  position: relative;
}
#contact {
  width: 60px;
  height: 60px;
  color: #ffffff;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
  background-color: #f0c42d;
  border-radius: 50%;
  box-shadow: 0px 0px 3px 3px #d0d0d0;
  margin: 20px 0;
  transition: all 0.3s ease;
}
#pointer {
  color: #f0c42d;
  font-size: 35px;
  position: absolute;
  bottom: 25px;
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
    color: #ffea9d;
    transform: translateX(0px) translateY(0px);
  }
  to {
    transform: translateX(40px) translateY(40px);
  }
}
</style>
