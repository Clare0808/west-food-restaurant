<template>
  <div class="contact-ele">
    <div class="title">聯絡客服</div>
    <div class="contact-content">
      <div class="sec-title">寫下你的想說的話吧!</div>
      <textarea type="text"></textarea>
    </div>
    <div class="btn-frame">
      <div class="cancel-btn">取消</div>
      <div class="submit-btn">提交</div>
    </div>
  </div>
</template>

<style scoped>
.contact-ele {
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
.contact-content {
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}
.sec-title {
  font-size: 22px;
}
textarea {
  width: calc(100% - 20px);
  font-size: 20px;
  font-family: "Brush Script MT", cursive;
  margin-top: 10px;
  height: 150px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #adadad;
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
.submit-btn,
.cancel-btn {
  width: 150px;
  height: 40px;
  font-size: 20px;
  border-radius: 20px;
  line-height: 40px;
  text-align: center;
  margin: 20px 20px 0px 20px;
  transition: all 0.3s ease;
}
.submit-btn {
  color: #ffffff;
  background-color: #f0c42d;
}
.cancel-btn {
  background-color: #ffffff;
  border: 1px solid #f0c42d;
}
.submit-btn:hover,
.cancel-btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
.cancel-btn:hover {
  border: 1px solid #ffea9d;
}
</style>
