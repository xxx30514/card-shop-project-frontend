<template>
  <ul>
    <li>query:ID:{{ route.query.id }}</li>
    <li>query:標題:{{ route.query.title }}</li>
  </ul>
  <ul>
    <li>query2:ID:{{ query.id }}</li>
    <li>query2:標題:{{ query.title }}</li>
  </ul>
  <ul>
    <li>param:ID:{{ route.params.id }}</li>
    <li>param:標題:{{ route.params.title }}</li>
  </ul>
  <ul>
    <li>param2:ID:{{ params.id }}</li>
    <li>param2:標題:{{ params.title }}</li>
  </ul>
  <ul>
    <li>props:ID:{{ id }}</li>
    <li>props:標題:{{ title }}</li>
  </ul>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
//從響應式物件解構屬性時會失去響應效果,需要toRefs維持其響應式屬性
const { query, params } = toRefs(route);
//使用route的props
defineProps(['id', 'title']);
</script>
