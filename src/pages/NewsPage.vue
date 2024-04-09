<template>
  <ul>
    <li v-for="news in newsList" :key="news.id">
      <!--query傳參數 第一種方法 -->
      <router-link :to="`/news/detail?id=${news.id}&title=${news.title}`">{{ news.title }}</router-link>
      <!-- query傳參數 第二種方法 -->
      <router-link
        :to="{
          path: '/news/detail',
          query: { id: news.id, title: news.title },
        }"
      >
        {{ news.title }}
      </router-link>
      <!-- <router-link
        :to="{
          name: 'detail',
          query: { id: news.id, title: news.title },
        }"
      >
        {{ news.title }}
      </router-link> -->
      <!-- TODO: params傳參數 第一種方法 使用params傳參數需要在routes.ts中先配置好-->
      <!-- routes.ts中的 path: 'detail/:id?/:title?'  ?表示不一定要傳遞-->
      <router-link :to="`/news/detail/${news.id}/${news.title}`">param:{{ news.title }}</router-link>
      <!--TODO: params傳參數 第二種方法 to的物件寫法 不能使用path 要使用name來配置 params無法傳遞物件與陣列 -->
      <!--router-link可以使用replace模式 點擊後會把歷史紀錄替換成當前頁面 無法按上一頁-->
      <router-link
        :to="{
          name: 'detail',
          params: { id: news.id, title: news.title },
        }"
        >param2:{{ news.title }}</router-link
      >
    </li>
  </ul>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const newsList = reactive([
  { id: 1, title: 123 },
  { id: 2, title: 456 },
  { id: 3, title: 789 },
]);
</script>

<style scoped>
li::marker {
  color: crimson;
}
</style>
