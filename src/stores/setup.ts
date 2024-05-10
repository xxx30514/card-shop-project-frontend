import { defineStore } from 'pinia';
import { ref } from 'vue';
//組合式store
export const useSetupStore = defineStore('setup', () => {
  const leftDrawerOpen = ref(true);
  function toggleLeftDraw() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }
  return { leftDrawerOpen, toggleLeftDraw };
});
