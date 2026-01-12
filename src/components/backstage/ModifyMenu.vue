<template>
  <div class="modify-menu">
    <div class="title">修改資訊</div>
    <div class="info-frame">
      <div class="img-frame">
        <img src="@/assets/images/homepage4.png" />
        <i class="fa-solid fa-pencil" id="pencil"></i>
      </div>
      <div class="text-outframe">
        <div class="text-frame">
          <div class="sec-title">名稱</div>
          <input type="text" placeholder="牛肉麵" />
        </div>
        <div class="text-frame">
          <div class="sec-title">類別</div>
          <input type="text" placeholder="noodle" />
        </div>
        <div class="text-frame">
          <div class="sec-title">金額</div>
          <input type="text" placeholder="$180" />
        </div>
        <div class="text-frame">
          <div class="sec-title">簡介</div>
          <textarea
            type="text"
            placeholder="豐富海鮮搭配香濃番茄醬汁與義式香料，帶來鮮美滋味的義式海鮮燉飯。"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="btn-frame">
      <div class="no-btn">取消</div>
      <div class="yes-btn">確定</div>
    </div>
  </div>
</template>

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
  font-size: 26px;
  margin-bottom: 10px;
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
  background-color: #f0c42d;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  position: absolute;
  bottom: 10px;
  right: 10px;
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
  text-align: center;
  border: none;
  border-bottom: 1px solid #f0c42d;
  padding: 5px;
}
input:focus {
  outline: none;
  border-bottom: 2px solid #f0c42d;
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
  border: 1px solid #f0c42d;
}
textarea:focus {
  outline: none;
  border: 2px solid #f0c42d;
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
