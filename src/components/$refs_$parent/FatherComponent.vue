<template>
  <div id="father">
    <h1>父組件</h1>
    <h2>車子:{{ car }}</h2>
    <button @click="changeToy">修改child1的資料</button>
    <button @click="changePhone">修改child2的資料</button>
    <button @click="getAllChild($refs)">獲取所有子組件</button>
    <ChildComponent ref="child1"></ChildComponent>
    <ChildComponent2 ref="child2"></ChildComponent2>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChildComponent from 'components/$refs_$parent/ChildComponent.vue';
import ChildComponent2 from 'components/$refs_$parent/ChildComponent2.vue';
//$refs 父傳子
//$parent 子傳父
const car = ref('mazda');
const child1 = ref();
const child2 = ref();
//向外提供資料
defineExpose({ car });
function changeToy() {
  child1.value.toy = '寶可夢';
}
function changePhone() {
  child2.value.phone = '三星';
}
function getAllChild(refs: { [key: string]: any }) {
  console.log(refs);
  for (let key in refs) {
    refs[key].toy = '數碼寶貝';
  }
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
