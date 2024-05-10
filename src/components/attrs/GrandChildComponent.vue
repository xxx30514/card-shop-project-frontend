<template>
  <div id="grand-child">
    <h1>孫組件</h1>
    <h2>a:{{ a }}</h2>
    <h2>x:{{ x }}</h2>
    <h2>y:{{ y }}</h2>
    <h2>car2:{{ car2 }}</h2>
    <button @click="updateA(1)">更改祖組件的a值</button>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
defineProps(['a', 'x', 'y', 'car2', 'updateA']);
</script>

<style scoped>
#grand-child {
  background-color: palegoldenrod;
  padding: 10px;
  margin: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 10px;
}
</style>
