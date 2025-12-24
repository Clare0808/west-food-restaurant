<template>
  <nav>
    <div class="logo">Le Savor 西饗</div>
    <div class="function-frame">
      <router-link to="/">主頁</router-link>
      <router-link to="/about">關於我們</router-link>
      <router-link to="/menu">菜單</router-link>
      <router-link to="/review">評論</router-link>
      <router-link to="/contact">客服中心</router-link>
    </div>
    <div class="icon-frame">
      <router-link to="/cart">
        <i class="fa-solid fa-cart-shopping"></i>
      </router-link>
      <router-link to="/user">
        <i class="fa-solid fa-user"></i>
      </router-link>
      <router-link to="/logout">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </router-link>
    </div>
  </nav>
  <div class="content-frame">
    <div class="text-frame">
      <div class="slogan">細細品味西式料理的藝術。</div>
      <div class="sec-slogan">精緻餐飲，應該成為日常生活的一部分。</div>
      <div class="content">
        我們嚴選高品質食材，以主廚等級的專業手藝精心製作每一道料理，<br />
        讓您無論何時、在家中也能輕鬆享受餐廳級的西式饗宴。
      </div>
      <div class="btn">了解更多</div>
    </div>
    <img src="@/assets/homepage2.png" alt="Logo" />
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: "Brush Script MT", cursive; // 字體設定
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #272727;

  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  overflow-x: hidden;
}

body {
  // 周圍不留空白
  margin: 0;
  padding: 0;
}
nav {
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 35px;
  font-weight: bold;
}
.function-frame a {
  color: #272727;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  margin: 0 20px;
  display: inline-block; // 讓動畫生效
  transition: all 0.3s ease;
}
.function-frame a:hover {
  color: #f0c42d;
  transform: scale(1.1);
}
.icon-frame i {
  color: #272727;
  font-size: 18px;
  margin: 0 10px;
  display: inline-block; // 讓動畫生效
  transition: all 0.3s ease;
}
.icon-frame i:hover {
  color: #f0c42d;
  transform: scale(1.1);
}

.content-frame {
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-frame {
  width: 40%;
  text-align: left;
}
.slogan {
  font-size: 34px;
  font-weight: bold;
}
.sec-slogan {
  color: #f0c42d;
  font-size: 26px;
  margin: 10px 0;
}
.btn {
  width: 150px;
  height: 40px;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  // background-color: #d7bd88;
  background-color: #f0c42d;
  border-radius: 20px;
  margin-top: 20px;
  transition: all 0.3s ease;
}
.btn:hover {
  color: #272727;
  background-color: #ffea9d;
  cursor: pointer;
  transform: scale(1.1);
}
img {
  width: 600px;
  height: auto;
}
</style>
