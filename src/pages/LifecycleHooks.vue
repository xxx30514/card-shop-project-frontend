<template>
  <h1>{{ sum }}</h1>
  <button @click="add">+1</button>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';
import { useMeta } from 'quasar';
import useCount from 'src/hooks/useCount';
const metaData = {
  // sets document title
  title: 'Index Page',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: (title: string) => `${title} - My Website`,
};
useMeta(metaData);
const { sum, add } = useCount();
// let sum = ref(0);
// function add() {
//   sum.value += 1;
// }
//vue實例載入前
onBeforeMount(() => {
  console.log('beforeMount');
});
//vue實例載入後
onMounted(() => {
  console.log('Mounted');
});
onBeforeUpdate(() => {
  console.log('BeforeUpdate');
});
onUpdated(() => {
  console.log('Updated');
});
onBeforeUnmount(() => {
  console.log('BeforeUnmount');
});
onUnmounted(() => {
  console.log('Unmounted');
});
</script>
