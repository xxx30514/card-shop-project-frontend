<template>
  <div id="grand-child">
    <h1>孫組件</h1>
    <h2>從祖組件獲得的資料:{{ money.money }}</h2>
    <h2>從祖組件獲得的資料:品牌:{{ car.brand }}價格:{{ car.price }}</h2>
    <button @click="money.updateMoney(6)">修改money</button>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
const money = inject('money', { money: 0, updateMoney: (param: number) => {} });
/*解構
const { money, updateMoney } = inject('money', {money:0, updateMoney: (x: number) => {} });
*/
const car = inject('car', { brand: '未知', price: 0 });
</script>

<style scoped>
#grand-child {
  background-color: palegoldenrod;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
