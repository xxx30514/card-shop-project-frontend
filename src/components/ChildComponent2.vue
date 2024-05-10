<template>
  <div id="child">
    <h1>子組件2</h1>
    <h2>從兄弟組件得到的資料:{{ brotherToy }}</h2>
  </div>
</template>
<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import emitter from 'src/utils/emitter';
import mitt from 'mitt';
const brotherToy = ref('');
//typescript指定型別
const type = mitt<{
  sendValue: string;
}>();
emitter.on('send-toy', (value: any) => {
  brotherToy.value = value;
});
type.on('sendValue', (value: string) => {
  brotherToy.value = value;
});
//在組件被銷毀完畢時解除事件綁定
onUnmounted(() => {
  emitter.off('send-toy');
});
</script>
