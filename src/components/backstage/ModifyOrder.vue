<template>
  <div class="modify-order">
    <div class="title">修改訂單</div>
    <div class="order-frame">
      <div class="sec-title">訂單標號</div>
      <div class="order-info">{{ orderList.code }}</div>
    </div>
    <div class="order-frame">
      <div class="sec-title">訂餐時間</div>
      <div class="order-info">{{ orderList.date }}</div>
    </div>
    <div class="dish-outframe">
      <div v-for="(buy, index) in orderList.list" :key="index">
        <div class="dish-frame">
          <div class="num-frame">
            <div class="num-btn" @click="CountDishAmount('-', index)">-</div>
            <div class="dish-amount">x{{ buy.amount }}</div>
            <div class="num-btn" @click="CountDishAmount('+', index)">+</div>
          </div>
          <div class="dish-info">{{ buy.name }}</div>
          <i
            class="fa-solid fa-pencil"
            id="pencil"
            @click="ClickPencil(index)"
          ></i>
          <div class="dish-price">${{ buy.total }}</div>
        </div>
      </div>
    </div>
    <div class="add-dish" @click="showOption = true">新增餐點+</div>
    <div class="order-frame">
      <div class="sec-title">總計</div>
      <div class="total-price">${{ totalPrice }}</div>
    </div>
    <div class="btn-frame">
      <div class="no-btn" @click="ClickCancel">取消</div>
      <div class="yes-btn" @click="SendModify">確定</div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import {
  showModify,
  modifyList,
  showOption,
  selectedOption,
} from "../../components/backstage/OrderPage.vue";
import { errorText, errorType } from "../../components/LoginPage.vue";
import {
  showErrorMsg,
  showLoader,
} from "../../components/backstage/ReviewPage.vue";

export default {
  setup() {
    const orderList = ref({});
    const totalPrice = ref(0);
    const tempIndex = ref(-1);

    const GetModifyList = () => {
      orderList.value = structuredClone(modifyList.value);

      totalPrice.value = orderList.value.total;
    };

    const CountDishAmount = (operator, index) => {
      const order = orderList.value.list[index];

      if (operator === "+") {
        order.amount += 1;

        totalPrice.value += order.price;
      } else if (operator === "-" && order.amount > 1) {
        order.amount -= 1;

        totalPrice.value -= order.price;
      }

      order.total = order.price * order.amount;
    };

    const FindDishPrice = async () => {
      if (selectedOption.value) {
        const response = await fetch("/data/dishData.json");
        const data = await response.json();

        const dish = data.find((item) => item.name === selectedOption.value);

        if (tempIndex.value >= 0) {
          const target = orderList.value.list[tempIndex.value];

          target.name = dish.name;
          target.price = dish.price;
          target.total = target.price * target.amount;
        } else {
          orderList.value.list.push({
            name: selectedOption.value,
            amount: 1,
            price: dish.price,
            total: dish.price,
          });
        }

        totalPrice.value = 0;

        for (const data of orderList.value.list) {
          totalPrice.value += data.total;
        }

        tempIndex.value = -1;
      }
    };

    const SendModify = async () => {
      if (
        JSON.stringify(orderList.value) !== JSON.stringify(modifyList.value)
      ) {
        const tempId = orderList.value._id;

        const response = await fetch(
          `http://localhost:3000/api/send-buy-orders`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: orderList.value.email,
              list: orderList.value.list,
              total: totalPrice.value,
              code: orderList.value.code,
              date: orderList.value.date,
            }),
          }
        );

        await RemoveOrder(tempId);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        errorText.value = "已成功修改訂單!";
        errorType.value = false;
        showErrorMsg.value = true;

        showModify.value = false;
        showLoader.value = true;

        setTimeout(() => {
          showErrorMsg.value = false;

          window.location.reload();
        }, 2000);
      } else {
        errorText.value = "訂單未修改!";
        errorType.value = true;

        showErrorMsg.value = true;

        setTimeout(() => {
          showErrorMsg.value = false;
        }, 2000);
      }
    };

    const RemoveOrder = async (id) => {
      const response = await fetch(
        `http://localhost:3000/api/remove-buy-orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            list: [id],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    };

    const ClickPencil = (index) => {
      showOption.value = true;

      tempIndex.value = index;
    };

    const ClickCancel = () => {
      showModify.value = false;

      orderList.value = modifyList.value;
    };

    watch(showOption, (newShow) => {
      if (newShow === false) {
        FindDishPrice();
      }
    });

    onMounted(() => {
      GetModifyList();
    });

    return {
      showModify,
      modifyList,
      showOption,
      selectedOption,
      errorText,
      errorType,
      showErrorMsg,
      showLoader,
      orderList,
      totalPrice,
      tempIndex,
      GetModifyList,
      CountDishAmount,
      FindDishPrice,
      SendModify,
      RemoveOrder,
      ClickPencil,
      ClickCancel,
    };
  },
};
</script>

<style scoped>
.modify-order {
  width: 65%;
  background-color: #ffffff;
  border: 1px solid #f0c42d;
  border-radius: 20px;
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
.order-frame {
  width: 80%;
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dish-outframe {
  width: 80%;
  margin: 20px 0;
}
.dish-frame {
  font-size: 20px;
  margin: 10px 0;
  display: grid;
  grid-template-columns: 20% 60% 10% 10%;
  justify-items: start;
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
.num-btn:hover {
  background-color: #f0c42d;
  cursor: pointer;
}
.dish-amount,
.total-price {
  color: #f0c42d;
}
.dish-amount {
  margin: 0 10px;
}
#pencil {
  color: #f0c42d;
  font-size: 18px;
  transition: all 0.3s ease;
}
#pencil:hover {
  color: #272727;
  cursor: pointer;
}
.add-dish {
  color: #f0c42d;
  font-size: 20px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}
.add-dish:hover {
  color: #272727;
  cursor: pointer;
}
.dish-price {
  width: 100%;
  text-align: end;
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
