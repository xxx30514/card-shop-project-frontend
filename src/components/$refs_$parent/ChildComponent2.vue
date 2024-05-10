<template>
  <div id="child">
    <h1>子組件2</h1>
    <h2>手機:{{ phone }}</h2>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const phone = ref('Apple');
defineExpose({ phone });
</script>
