<template>
  <div id="father">
    <h1>父組件</h1>
    <h2>{{ a }}</h2>
    <h2>{{ car }}</h2>
    <h2>{{ car2 }}</h2>
    <!-- 傳遞{{}}要加上: 否則會視為字串-->
    <ChildComponent
      :car="car"
      carString="car"
      v-bind="{ x: 100, y: 200 }"
      :car2="car2"
      :a="a"
      :updateA="updateA"
    ></ChildComponent>
  </div>
</template>

<script setup lang="ts">
import ChildComponent from './ChildComponent.vue';
import { ref } from 'vue';

const car = ref('mazda');
const car2 = ref('bmw');
const toy = ref('');
const a = ref(1);
//儲存子組件傳遞的props toy
function getToy(value: string) {
  toy.value = value;
}
function updateA(value: number) {
  a.value += value;
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
