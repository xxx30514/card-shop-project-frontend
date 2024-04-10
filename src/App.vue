<template>
  <router-view />
  <!-- 傳遞props給子組件 -->
  <setup-script :list="personList" ref="data1"></setup-script>
  <button @click="test">測試</button>
  <!-- <LifecycleHooks /> -->
</template>

<script setup lang="ts">
import SetupScript from 'pages/SetupScript.vue';
import LifecycleHooks from './pages/LifecycleHooks.vue';
import { ref, reactive, onMounted } from 'vue';
import { useMeta } from 'quasar';
import { type Persons } from 'src/types/interface';
//傳遞props給子組件
let personList = reactive<Persons>([{ id: 1, name: '小王', age: 10 }]);
let data1 = ref();

function test() {
  console.log(data1.value);
}
const metaData = {
  // sets document title
  title: 'Index Page',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
};
useMeta(metaData);
onMounted(() => {
  console.log('App.vue-Mounted');
});
</script>
