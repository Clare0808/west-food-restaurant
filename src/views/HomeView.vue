<template>
  <div class="home">
    <div class="content-frame">
      <transition name="slide">
        <div class="text-frame" v-if="showText">
          <div class="slogan">細細品味西式料理的藝術。</div>
          <div class="sec-slogan">精緻餐飲，應該成為日常生活的一部分。</div>
          <div class="content">
            我們嚴選高品質食材，以主廚等級的專業手藝精心製作每一道料理，<br />
            讓您無論何時、在家中也能輕鬆享受餐廳級的西式饗宴。
          </div>
          <div class="btn">了解更多</div>
        </div>
      </transition>
      <transition name="fade">
        <img src="@/assets/images/homepage2.png" v-if="showImage" />
      </transition>
    </div>
  </div>
  <div class="home">
    <div class="title">熱門菜色</div>
    <div class="dish-info-frame" id="slide">
      <img src="@/assets/images/homepage3.png" />
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
    <div class="dish-info-frame" id="slide">
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
      <img src="@/assets/images/homepage4.png" />
    </div>
  </div>
  <div class="home">
    <div class="title">Why Le Savor 西饗 ?</div>
    <div class="info-frame1" id="slide">
      <div
        class="info-box-frame"
        v-for="(info, index) in infoData1"
        :key="index"
      >
        <div class="info-box">
          <i :class="info.icon"></i>
          <div class="info-title">{{ info.title }}</div>
          <div class="info-description">{{ info.description }}</div>
        </div>
      </div>
    </div>
    <div class="info-frame2" id="slide">
      <div
        class="info-box-frame"
        v-for="(info, index) in infoData2"
        :key="index"
      >
        <div class="info-box">
          <i :class="info.icon"></i>
          <div class="info-title">{{ info.title }}</div>
          <div class="info-description">{{ info.description }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="home">
    <div class="title">顧客回饋</div>
    <div class="review-frame" id="slide">
      <div class="last-page">〈</div>
      <div class="review-box">
        <div class="review-stars">
          <div v-for="i in 5" :key="i">
            <i class="fa-solid fa-star"></i>
          </div>
        </div>
        <div class="review-content">
          Le Savor
          的料理讓我在家也能享受餐廳級的美味，服務也非常貼心，強烈推薦！
        </div>
        <div class="review-author-info">
          <i class="fa-solid fa-user"></i>
          <div class="review-text-frame">
            <div class="review-author-name">張小姐</div>
            <div class="review-author-date">2025/10/30</div>
          </div>
        </div>
      </div>
      <div class="next-page">〉</div>
    </div>
    <div class="contact-frame">
      <div class="contact-title">有任何問題歡迎聯絡我們！</div>
      <div class="contact-info">
        <i class="fa-solid fa-envelope"></i>
        123456@gmail.com
      </div>
      <div class="contact-info">
        <i class="fa-solid fa-phone"></i>
        0987654321
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "HomeView",
  setup() {
    const showText = ref(false);
    const showImage = ref(false);
    const infoData1 = [
      {
        icon: "fa-solid fa-utensils",
        title: "主廚等級的料理工藝",
        description:
          "我們的料理由經驗豐富的主廚精心製作，確保每一道菜色都達到最高品質標準。",
      },
      {
        icon: "fa-solid fa-leaf",
        title: "嚴選頂級食材來源",
        description:
          "我們只選用通過品質認證的進口肉品、新鮮蔬菜與天然香料，堅持不使用來路不明或過度加工的食材，為您的餐桌把關每一口安心。",
      },
      {
        icon: "fa-solid fa-snowflake",
        title: "冷鏈直送鎖住新鮮",
        description:
          "全程低溫配送，從出餐到您手中皆維持最佳保存狀態，完美鎖住鮮度與風味，確保餐點到家仍如剛出爐般美味。",
      },
    ];
    const infoData2 = [
      {
        icon: "fa-solid fa-gift",
        title: "儀式感為日常而生",
        description:
          "Le Savor 相信用餐不只是填飽肚子，我們為每一道料理設計專屬擺盤與份量比例，讓平凡的夜晚，也能變成值得記住的饗宴時刻。",
      },
      {
        icon: "fa-solid fa-earth-asia",
        title: "用心對待地球",
        description:
          "支持在地小農與友善飼養，使用環保包裝材料，讓美味與責任同時被端上餐桌。",
      },
    ];

    // 元素進入視窗後顯示動畫
    const CheckFadeIn = () => {
      document.querySelectorAll("#slide").forEach((el) => {
        // 判斷元素是否進入視窗
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add("visible"); // 如果進入就觸發動畫
        }
      });
    };

    window.addEventListener("scroll", CheckFadeIn); // 滾動畫面時進行檢查

    onMounted(() => {
      showText.value = true;
      showImage.value = true;
    });

    return {
      showText,
      showImage,
      infoData1,
      infoData2,
      CheckFadeIn,
    };
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: relative;
}
.content-frame {
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-frame {
  width: 45%;
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
.dish-info-frame i {
  color: #f0c42d;
  font-size: 20px;
  margin: 0 3px;
  transition: all 0.3s ease;
}
.dish-info-frame i:hover {
  transform: scale(1.2);
}
.dish-info-frame img {
  width: 250px;
  margin: 0 20px;
  transition: all 0.3s ease;
}
.dish-info-frame img:hover {
  transform: scale(1.05);
}
.info-frame1,
.info-frame2 {
  display: grid;
  justify-content: center;
  align-items: center;
}
.info-frame1 {
  grid-template-columns: repeat(3, 30%);
}
.info-frame2 {
  grid-template-columns: repeat(2, 30%);
}
.info-box-frame {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}
.info-box {
  width: 100%;
  height: 200px;
  text-align: center;
  margin: 0 10px;
  padding: 20px;
  /* background-color: #fdf8e1; */
  background-color: #ffea9d;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}
.info-box:hover {
  color: white;
  background-color: #f0c42d;
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
.review-frame {
  padding: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.last-page,
.next-page {
  width: 50px;
  height: 50px;
  font-size: 30px;
  font-weight: bold;
  line-height: 50px;
  color: #ffffff;
  background-color: #ffea9d;
  border-radius: 50%;
  box-shadow: 0px 0px 5px 5px #ffea9d;
  transition: all 0.5s ease;
}
.last-page:hover,
.next-page:hover {
  cursor: pointer;
  background-color: #f0c42d;
  box-shadow: 0px 0px 5px 5px #f0c42d;
  transform: scale(1.05);
}
.review-box {
  width: 60%;
  background-color: #ffffff;
  border: 2px solid #ffea9d;
  border-radius: 20px;
  margin: 0 30px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  transition: all 0.3s ease;
}
.review-box:hover {
  transform: translateY(-10px);
}
.review-stars {
  color: #f0c42d;
  font-size: 24px;
  display: flex;
  justify-content: start;
}
.review-stars i {
  margin: 0 3px;
}
.review-content {
  font-size: 22px;
  margin: 20px 0;
  text-align: start;
}
.review-author-info {
  text-align: start;
  display: flex;
  align-items: center;
}
.review-author-info i {
  font-size: 40px;
  margin-right: 20px;
}
.review-text-frame {
  font-size: 20px;
}
.contact-frame {
  width: 100%;
  height: calc(20% - 20px);
  color: #ffffff;
  font-size: 22px;
  text-align: start;
  background-color: #f0c42d;
  padding: 20px;
  position: absolute;
  bottom: 0;
}
.contact-title {
  margin-left: 30px;
}
.contact-info {
  margin-left: 50px;
  margin-top: 10px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

#slide {
  transition: all 1s ease;
  opacity: 0;
  transform: translateY(20px);
}
#slide.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
