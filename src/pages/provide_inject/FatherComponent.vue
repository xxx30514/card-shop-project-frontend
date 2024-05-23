<template>
  <div id="father">
    <h1>父組件</h1>
    <h2>資產:{{ money }}萬</h2>
    <h2>車子:一輛{{ car.brand }},價值{{ car.price }}萬</h2>

    <ChildComponent></ChildComponent>
  </div>
</template>

<script setup lang="ts">
import ChildComponent from 'pages/provide_inject/ChildComponent.vue';
import { ref, reactive, provide } from 'vue';
interface Car {
  brand: string;
  price: number;
}

let money = ref(100);
const car: Car = reactive({ brand: '本田', price: 100 });
function updateMoney(value: number) {
  money.value += value;
}
//provide(key,value) 傳遞資料給子組件、孫組件等等直系後代
provide('money', { money, updateMoney });
provide('car', car);
</script>
<style scoped>
#father {
  background-color: aqua;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
