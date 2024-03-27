<template>
  <router-view />
  <!-- <setup-script :list="personList"></setup-script> -->
  <!-- <LifecycleHooks /> -->
</template>

<script setup lang="ts">
import SetupScript from 'pages/SetupScript.vue';
import LifecycleHooks from './pages/LifecycleHooks.vue';
import { reactive, onMounted } from 'vue';
import { type Persons } from 'src/types/interface';
let personList = reactive<Persons>([{ id: 1, name: '小王', age: 10 }]);
onMounted(() => {
  console.log('App.vue-Mounted');
});
</script>
