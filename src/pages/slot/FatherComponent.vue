<template>
  <div id="father">
    <h1>父組件</h1>
    <div class="content">
      <!--預設插槽-->
      <CategoryPage title="熱門遊戲列表">
        <ul>
          <li v-for="item in games" :key="item.id">{{ item.name }}</li>
        </ul>
      </CategoryPage>
      <!--具名插槽  v-slot:name 可以簡寫為#name -->
      <CategoryPage>
        <template v-slot:s1>
          <h2>熱門手機品牌</h2>
        </template>
        <template #s2>
          <ul>
            <li v-for="item in phones" :key="item.id">{{ item.name }}</li>
          </ul>
        </template>
      </CategoryPage>
      <CategoryPage title="分類3"></CategoryPage>
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryPage from './CategoryPage.vue';
import { ref, reactive } from 'vue';
let games = reactive([
  { id: 1, name: '英雄聯盟' },
  { id: 2, name: '楓之谷' },
  { id: 3, name: '遊戲王' },
]);
let phones = reactive([
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Samsung' },
  { id: 3, name: 'Pixel' },
]);
</script>
<style scoped>
#father {
  background-color: lightgray;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
.content {
  display: flex;
  justify-content: space-evenly;
}
h2 {
  background-color: orange;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
</style>
