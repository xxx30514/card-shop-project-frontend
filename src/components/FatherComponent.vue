<template>
  <div id="father">
    <h1>父組件</h1>
    <h2>{{ car }}</h2>
    <h2 v-if="toy">子組件傳遞的資料:{{ toy }}</h2>
    <!-- 父傳子屬性值為非函數 子傳父屬性值為函數 -->
    <!-- 給子組件ChildComponent 綁定事件@event="getToy"  自定義事件@send-toy-->
    <ChildComponent :car="car" :sendToy="getToy" @send-toy="getToy"></ChildComponent>
    <ChildComponent2></ChildComponent2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChildComponent from 'components/ChildComponent.vue';
import ChildComponent2 from './ChildComponent2.vue';
const car = ref('mazda');
const toy = ref('');

//儲存子組件傳遞的props toy
function getToy(value: string) {
  toy.value = value;
}
</script>
<style scoped>
#father {
  background-color: aqua;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
