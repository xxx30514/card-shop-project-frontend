<template>
  <div id="child">
    <h1>子組件</h1>
    <h2>{{ toy }}</h2>
    <h2>父組件傳遞的資料:{{ car }}</h2>
    <button @click="sendToy(toy)">傳遞props給父組件</button>
    <button @click="emit('send-toy', toy2)">自定義事件傳遞props給父組件</button>
    <button @click="emitter.emit('send-toy', toy)">emitter傳遞資料給兄弟組件</button>
    <button @click="type.emit('sendValue', toy)">emitter傳遞資料給兄弟組件2</button>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import emitter from 'src/utils/emitter';
import mitt from 'mitt';
const toy = ref('四驅車');
const toy2 = ref('戰鬥陀螺');
const type = mitt<{
  sendValue: string;
}>();
//接收父組件的props
//defineProps(['car', 'sendToy']);
defineProps<{ car: string; sendToy: any }>();
//自定義事件傳遞props給父組件
const emit = defineEmits(['send-toy']);
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
