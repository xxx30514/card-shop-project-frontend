<template>
  <div class="string">
    <button @click="getString">得到字串</button>
    <h2>{{ countStore.sum }}</h2>
    <ul>
      <li v-for="item in stringList" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useStringStore } from 'stores/string';
import { useCountStore } from 'stores/count';
import { storeToRefs } from 'pinia';
const stringStore = useStringStore();
const countStore = useCountStore();
const { stringList } = storeToRefs(stringStore);
// const stringList = reactive([
//   { id: 1, title: '字串1' },
//   { id: 2, title: '字串2' },
//   { id: 3, title: '字串3' },
// ]);
function getString() {
  //let obj = { id: 4, title: '字串4' };
  //stringList.push(obj);
  stringStore.getString();
}
</script>
<style scoped>
.string {
  background-color: pink;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
  select,
  button {
    margin: 0 5px;
    height: 30px;
  }
}
</style>
