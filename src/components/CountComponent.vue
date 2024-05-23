<template>
  <div class="count">
    <h1>數字:{{ sum }}</h1>
    <h1>資料:{{ data }}</h1>
    <h1>城市:{{ city }}</h1>
    <h1>sum*2:{{ doubleCount }}</h1>
    <h1>sum*10:{{ bigSum }}</h1>
    <select v-model.number="number">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">+</button>
    <button @click="minus">-</button>
    <button @click="batchUpdate">批次修改</button>
    <!--修改狀態的第三種方式 調用store中的action-->
    <button @click="increment">+1直到10</button>
    <button @click="countStore.increment(number)">+1直到10</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
//匯入store
import { useCountStore } from 'stores/count';
import { storeToRefs } from 'pinia';
//使用store 管理Count的狀態(state)
const countStore = useCountStore();
//解構store的資料
const { sum, data, city, doubleCount, bigSum } = storeToRefs(countStore);
//store的監聽器
countStore.$subscribe((mutate, state) => {
  //localStorage只能存字串  JSON.stringify JS物件轉字串
  localStorage.setItem('sum', JSON.stringify(state.sum));
});
let number = ref(1);
function add() {
  //修改狀態的第一種方式
  sum.value += number.value;
}
function minus() {
  countStore.sum -= number.value;
}
function batchUpdate() {
  //修改狀態的第二種方式 批次修改
  countStore.$patch({ sum: 100, data: '新的資料', city: '新北市板橋區' });
}
//修改狀態的第三種方式 調用store中的action
function increment() {
  countStore.increment(number.value);
}
</script>
<style scoped>
.count {
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  select,
  button {
    margin: 0 5px;
    height: 30px;
  }
}
</style>
