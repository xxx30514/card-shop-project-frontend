<template>
  <div id="child">
    <h1>子組件</h1>
    <h2>父組件的資料car:{{ car }}</h2>
    <h2>父組件的資料carString:{{ carString }}</h2>
    <h2>attr:{{ attrs.car2 }}</h2>
    <GrandChildComponent v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import GrandChildComponent from './GrandChildComponent.vue';
import { ref, Ref } from 'vue';
defineProps(['car', 'carString']);
const attrs = useAttrs();
console.log(attrs.a);
console.log(attrs.car2);
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
