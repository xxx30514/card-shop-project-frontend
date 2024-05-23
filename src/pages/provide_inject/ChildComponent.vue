<template>
  <div id="child">
    <h1>子組件</h1>
    <GrandChildComponent />
  </div>
</template>

<script setup lang="ts">
import GrandChildComponent from 'pages/provide_inject/GrandChildComponent.vue';
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
