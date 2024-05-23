<template>
  <div class="game">
    <h2>遊戲列表</h2>
    <slot :gameList="games"></slot>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
let games = reactive([
  { id: 1, name: '英雄聯盟' },
  { id: 2, name: '楓之谷' },
  { id: 3, name: '遊戲王' },
]);
</script>

<style scoped>
.game {
  background-color: skyblue;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  padding: 10px;
  width: 200px;
  height: 300px;
}
.game h2 {
  background-color: orange;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
</style>
