<template>
  <div class="back-order">
    <div class="order-box-outframe">
      <div class="order-box-frame" v-for="order in orderData" :key="order">
        <div class="order-box">
          <div class="text-outframe">
            <div class="text-frame">
              <div class="order-info">{{ order.code }}</div>
              <div class="order-date">{{ order.date }}</div>
            </div>
            <div class="text-frame">
              <div class="order-info">{{ order.name }}</div>
              <div class="order-info">{{ order.email }}</div>
              <div class="order-info">{{ order.phone }}</div>
            </div>
            <div class="order-info-box-outframe">
              <div
                class="order-info-box-frame"
                v-for="list in order.list"
                :key="list"
              >
                <div class="text-frame">
                  <div class="order-info">{{ list.name }}</div>
                  <div class="order-info">x{{ list.amount }}</div>
                </div>
              </div>
            </div>
            <div class="order-price">${{ order.total }}</div>
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
import { ref, onMounted } from "vue";

export default {
  name: "BackOrder",
  setup() {
    const orderData = ref({});

    const GetOrderData = async () => {
      const userMail = localStorage.getItem("userEmail");

      const responseOrder = await fetch(
        `http://localhost:3000/api/get-buy-orders`
      );
      const dataOrder = await responseOrder.json();

      const responseUser = await fetch(`http://localhost:3000/api/send-data`);
      const dataUser = await responseUser.json();

      orderData.value = dataOrder;

      for (const item of orderData.value) {
        item.name = dataUser.filter((i) => i.email === userMail)[0].name;
        item.phone = dataUser.filter((i) => i.email === userMail)[0].number;
      }

      console.log(orderData.value);
    };

    onMounted(async () => {
      await GetOrderData();
    });

    return {
      orderData,
      GetOrderData,
    };
  },
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
