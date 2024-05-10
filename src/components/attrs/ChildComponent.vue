<template>
  <div id="child">
    <h1>子組件</h1>
    <h2>父組件的資料car:{{ car }}</h2>
    <h2>父組件的資料carString:{{ carString }}</h2>
    <GrandChildComponent v-bind="$attrs" />
  </div>
</template>

<script setup lang="ts">
import GrandChildComponent from './GrandChildComponent.vue';
import { ref, Ref } from 'vue';
defineProps(['car', 'carString']);
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
