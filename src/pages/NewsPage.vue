<template>
  <ul>
    <li v-for="news in newsList" :key="news.id">
      <router-link to="/news/detail">{{ news.title }}</router-link>
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
