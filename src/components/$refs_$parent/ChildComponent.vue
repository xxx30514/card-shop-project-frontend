<template>
  <div id="child">
    <h1>子組件</h1>
    <h2>玩具:{{ toy }}</h2>
    <h2>玩具:{{ toy2 }}</h2>
    <button @click="getCar($parent)">子傳父</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import emitter from 'src/utils/emitter';
import mitt from 'mitt';

const toy = ref('四驅車');
const toy2 = ref('戰鬥陀螺');
//向外提供資料
defineExpose({ toy, toy2 });
function getCar(parent: any) {
  console.log(parent);
  parent.car = 'bmw';
}
</script>

<style scoped>
#child {
  background-color: chartreuse;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
