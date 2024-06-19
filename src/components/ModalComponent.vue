<template>
  <button @click="open = true">Open Modal</button>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
</script>
<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: seagreen;
}
/* position: fixed;屬性若有任一祖先元素 設置了transform、perspective 或者 filter等樣式屬性 會導致布局變動
本來包覆在outer內的 modal應以整個頁面body為父元素來定位 若outer設置了上述樣式 modal會變成以outer為父元素定位
利用teleport 將modal指向body 可以避免樣式錯誤
to 可以指向元素選擇器 ex:body 也可以指向class選擇器 ex:.demo  id選擇器ex:#demo

 */
</style>
