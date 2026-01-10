<template>
  <div class="back-order">
    <div class="order-box-outframe">
      <div class="order-box-frame" v-for="i in 10" :key="i">
        <div class="order-box">
          <div class="text-outframe">
            <div class="text-frame">
              <div class="order-info">MM20162010</div>
              <div class="order-date">2026-01-19 10:20</div>
            </div>
            <div class="text-frame">
              <div class="order-info">王筱寧</div>
              <div class="order-info">test123@gmail.com</div>
              <div class="order-info">0912345678</div>
            </div>
            <div class="order-info-box-outframe">
              <div class="order-info-box-frame" v-for="i in 2" :key="i">
                <div class="text-frame">
                  <div class="order-info">碳烤豬肋排</div>
                  <div class="order-info">x1</div>
                </div>
              </div>
            </div>
            <div class="order-price">$180</div>
          </div>
          <div class="btn-frame">
            <i class="fa-solid fa-pencil"></i>
            <i class="fa-solid fa-trash-can"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BackOrder",
};
</script>

<style scoped>
.back-order {
  width: calc(100% - 290px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.order-box-outframe {
  width: 95%;
  padding-right: 40px;
  overflow-y: auto;
}
.order-box-frame {
  width: 100%;
}
.order-box {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text-outframe {
  width: 100%;
  font-size: 20px;
  border-right: 1px solid #f0c42d;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text-frame {
  width: 100%;
  font-size: 18px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-date {
  color: #9d9d9d;
}
.order-info-box-outframe {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}
.order-info-box-frame {
  width: 98%;
}
.order-price {
  width: 100%;
  color: #f0c42d;
  text-align: end;
}
.btn-frame {
  margin-left: 20px;
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
</style>
