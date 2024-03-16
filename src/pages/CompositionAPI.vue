<template>
  <h1>{{ count }}</h1>
  <h1 class="color">{{ double }}</h1>
  <button @click="add">add</button>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue';
export default defineComponent({
  setup() {
    let count = ref(0); //變數宣告要在最前面 否則會有初始化錯誤的問題
    let color = ref('red');
    function add() {
      count.value++;
    }
    let double = computed(() => {
      return count.value * 2;
    });
    //function (newV, old) == (newV, old)=>
    watch(count, function (newValue, oldValue) {
      console.log(count.value);
      console.log(newValue);
      console.log(oldValue + '舊');
      if (count.value % 2 === 0) {
        color.value = 'red';
      } else {
        color.value = 'blue';
      }
    });
    return {
      count,
      add,
      double,
      color,
    };
  },
});
</script>

<style>
.color {
  color: v-bind(color);
}
</style>
