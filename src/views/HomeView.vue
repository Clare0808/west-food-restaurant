<template>
  <div class="home">
    <div class="title">熱門菜色</div>
    <div class="dish-info-frame">
      <img src="@/assets/homepage3.png" />
      <div class="text-frame">
        <div class="dish-name">茄汁肉醬寬扁麵</div>
        <div class="dish-description">
          以新鮮番茄熬製的濃郁肉醬，搭配彈牙的寬扁麵，帶來豐富的口感與層次。
        </div>
        <div class="dish-stars-title">
          推薦指數
          <span class="dish-stars" v-for="i in 5" :key="i">
            <i class="fa-solid fa-star"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="dish-info-frame">
      <div class="text-frame">
        <div class="dish-name">青醬貝殼義大利麵</div>
        <div class="dish-description">
          以新鮮羅勒和松子製成的青醬，搭配貝殼義大利麵，風味獨特。
        </div>
        <div class="dish-stars-title">
          推薦指數
          <span class="dish-stars" v-for="i in 4" :key="i">
            <i class="fa-solid fa-star"></i>
          </span>
        </div>
      </div>
      <img src="@/assets/homepage4.png" />
    </div>
  </div>
  <div class="home">
    <div class="title">Why Le Savor 西饗 ?</div>
    <div class="info-box-frame">
      <div class="info-box">
        <i class="fa-solid fa-utensils"></i>
        <div class="info-title">主廚等級的料理工藝</div>
        <div class="info-description">
          我們的料理由經驗豐富的主廚精心製作，確保每一道菜色都達到最高品質標準。
        </div>
      </div>
      <div class="info-box">
        <i class="fa-solid fa-leaf"></i>
        <div class="info-title">嚴選頂級食材來源</div>
        <div class="info-description">
          我們只選用通過品質認證的進口肉品、新鮮蔬菜與天然香料，堅持不使用來路不明或過度加工的食材，為您的餐桌把關每一口安心。
        </div>
      </div>
      <div class="info-box">
        <i class="fa-solid fa-snowflake"></i>
        <div class="info-title">冷鏈直送鎖住新鮮</div>
        <div class="info-description">
          全程低溫配送，從出餐到您手中皆維持最佳保存狀態，完美鎖住鮮度與風味，確保餐點到家仍如剛出爐般美味。
        </div>
      </div>
    </div>
    <div class="info-box-frame">
      <div class="info-box">
        <i class="fa-solid fa-gift"></i>
        <div class="info-title">儀式感為日常而生</div>
        <div class="info-description">
          Le Savor
          相信用餐不只是填飽肚子，我們為每一道料理設計專屬擺盤與份量比例，讓平凡的夜晚，也能變成值得記住的饗宴時刻。
        </div>
      </div>
      <div class="info-box">
        <i class="fa-solid fa-earth-asia"></i>
        <div class="info-title">用心對待地球</div>
        <div class="info-description">
          支持在地小農與友善飼養，使用環保包裝材料，讓美味與責任同時被端上餐桌。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.home {
  height: 100vh;
  padding: 0 50px;
}
.title {
  color: #f0c42d;
  font-size: 30px;
  font-weight: bold;
  padding-top: 50px;
}
.dish-info-frame {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
.dish-name {
  font-size: 26px;
  margin: 10px 0;
}
.dish-stars-title {
  margin: 10px 0;
}
i {
  color: #f0c42d;
  font-size: 20px;
  margin: 0 3px;
}
img {
  width: 250px;
  margin: 0 20px;
}
.info-box-frame {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
.info-box {
  width: 30%;
  height: 200px;
  text-align: center;
  margin: 0 10px;
  padding: 20px;
  background-color: #fdf8e1;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info-box i {
  font-size: 40px;
  margin-bottom: 10px;
}
.info-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
