<template>
  <div class="outer">
    <h3>Tooltips with Vue 3 Teleport</h3>
    <modal-component></modal-component>
    <hello-component></hello-component>
    {{ $base_url }}
    {{ sum }}
    <h4 v-my-style="sum">測試+</h4>
    <h4 v-my-style-2>測試2</h4>
    <div></div>
  </div>
</template>
<script setup lang="ts">
import ModalComponent from 'components/ModalComponent.vue';
import { ref } from 'vue';
let sum = ref(0);
</script>
<style scoped>
.outer {
  background-color: #ddd;
  border-radius: 10px;
  padding: 5px;
  width: 600px;
  height: 600px;
  filter: saturate(200%);
}
</style>
