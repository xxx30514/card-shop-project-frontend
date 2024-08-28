<template>
  <div>
    <h2>{{ msg }}</h2>
    <input type="text" v-model="msg" />
    <br />
    <h2>{{ test }}</h2>
    <input type="text" v-model="test" />
  </div>
</template>
<script setup lang="ts">
import { customRef } from 'vue';
import useMsg, { abc } from 'src/composables/useMsg';
let { msg, test } = useMsg('123', 1000);
//customRef 可控制資料更新頻率 達到防抖效果 track() trigger()
//const { msg } = abc('1234', 1000);

// let initValue: string = '你好';
// let timer: NodeJS.Timeout;
// let msg = customRef((track, trigger) => {
//   return {
//     //讀取msg資料時呼叫
//     get(): string {
//       track(); //對msg持續追蹤 一但msg變化就立即更新
//       return initValue;
//     },
//     //msg資料更新時呼叫
//     set(value) {
//       clearTimeout(timer);
//       timer = setTimeout(() => {
//         initValue = value;
//         trigger(); //告知vue msg的資料發生變化
//       }, 500);
//     },
//   };
// });
</script>
