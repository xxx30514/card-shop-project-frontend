<template>
  <q-layout view="hHh LpR fff">
    <q-header class="bg-teal-14 text-blue-grey-10" height-hint="98" align="center">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="q-show xs" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <q-avatar size="80px">
            <img src="/statics/shop_logo.png" />
          </q-avatar>
          Title
          <q-avatar size="80px">
            <img src="/statics/shop_logo.png" />
          </q-avatar>
        </q-toolbar-title>
        <q-btn
          dense
          color="primary"
          size="lg"
          flat
          class="q-ml-auto flex flex-column items-center"
          style="width: 64px; height: 64px"
        >
          <q-icon color="white" name="shopping_cart" size="md" />
          <span style="font-size: 12px" class="text-white">購物車</span>
          <q-badge color="red" floating style="font-size: 12px; top: 0px; right: 4px">4</q-badge>
        </q-btn>
      </q-toolbar>
      <!-- q-show gt-xs 大於xs尺存時顯示-->
      <q-tabs align="center" class="q-pa-none black-border flex justify-center">
        <div s class="q-show gt-xs flex justify-center">
          <q-route-tab to="/page1" label="Page One" />
          <q-route-tab to="/page2" label="Page Two" />
          <q-route-tab to="/page3" label="Page Three" />
          <q-route-tab to="/page3" label="Page Three" />
          <q-route-tab to="/page3" label="Page Three" />
          <q-route-tab to="/page3" label="Page Three" />
          <q-route-tab to="/page3" label="Page Three" />
        </div>
        <!-- <div style="display: flex; align-items: center; gap: 8px; flex-wrap: nowrap"> -->
        <!-- 搜尋框 -->
        <q-input
          dark
          dense
          standout
          bordered
          v-model="text"
          input-class="text-left text-blue-grey-10"
          class="q-ml-md q-mr-md"
          placeholder="search"
          input-style="font-size: 20px;"
        >
          <template v-slot:prepend>
            <q-icon v-if="text === ''" name="search" color="blue-grey-10" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
        <!-- /搜尋框 -->
        <!-- 購物車按鈕 -->
        <!-- <q-btn dense color="primary" round icon="shopping_cart" size="lg" style="margin-left: auto">
          <q-badge color="red" floating style="font-size: 12px; top: 0px; right: 4px">4</q-badge>
        </q-btn> -->
        <!-- /購物車按鈕 -->
        <!-- </div> -->
        <!-- <q-btn
          dense
          color="primary"
          size="lg"
          flat
          style="
            margin-left: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 64px;
            height: 64px;
          "
        >
          <q-icon color="white" name="shopping_cart" size="md" />
          <span style="font-size: 12px; margin-top: 0px" class="text-white">購物車</span>
          <q-badge color="red" floating style="font-size: 12px; top: 0px; right: 4px">4</q-badge>
        </q-btn> -->
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay dark>
      <q-btn>123</q-btn>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
    </q-drawer>

    <q-page-container class="q-mt-md">
      <q-page class="q-pa-xs q-pl-md" style="border: 10px black solid">
        <p v-for="n in 5" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore
          vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi
          perferendis voluptate?
        </p>
        <div class="row q-gutter-sm inline black-border">
          <div>row=子元素水平排列inline表示容器大小隨內容變更</div>
          <div class="bg-purple text-white q-pa-md">A</div>
          <div class="bg-orange text-white q-pa-md">B</div>
          <div class="bg-teal text-white q-pa-md">C</div>
        </div>
        <div class="row q-gutter-sm black-border">
          <div>沒有inline表示子容器大小會填滿空間</div>
          <div class="bg-purple text-white q-pa-md">A</div>
          <div class="bg-orange text-white q-pa-md">B</div>
          <div class="bg-teal text-white q-pa-md">C</div>
        </div>
        <div class="column inline q-gutter-sm black-border">
          <div>column=子元素垂直排列inline表示容器大小隨內容變更</div>
          <div class="bg-purple text-white q-pa-md">A</div>
          <div class="bg-orange text-white q-pa-md">B</div>
          <div class="bg-teal text-white q-pa-md">C</div>
        </div>
        <div class="column q-gutter-sm black-border">
          <div>沒有inline表示子容器大小會填滿空間</div>
          <div class="bg-purple text-white q-pa-md">A</div>
          <div class="bg-orange text-white q-pa-md">B</div>
          <div class="bg-teal text-white q-pa-md">C</div>
        </div>
        <!-- <q-page-scroller reverse position="top-right" :scroll-offset="30" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_down" color="secondary"
            ><q-tooltip class="bg-indigo text-body2">回到底部</q-tooltip></q-btn
          >
        </q-page-scroller> -->
        <router-view />
        <!-- <q-page-scroller position="bottom-right" :scroll-offset="200" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="secondary"
            ><q-tooltip class="bg-indigo text-body2">回到頂部</q-tooltip></q-btn
          >
        </q-page-scroller> -->
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <div class="column items-end q-mt-xs">
            <!-- 到頂按鈕 -->
            <q-btn color="primary" icon="keyboard_arrow_up" round size="md" class="q-mb-sm" @click="scrollToTop"
              ><q-tooltip class="bg-indigo text-body2">回到頂部</q-tooltip></q-btn
            >
            <!-- 到底按鈕 -->
            <q-btn color="primary" icon="keyboard_arrow_down" round size="md" class="q-mb-sm" @click="scrollToBottom"
              ><q-tooltip class="bg-indigo text-body2">回到底部</q-tooltip></q-btn
            >
          </div>
        </q-page-sticky>
      </q-page>
    </q-page-container>

    <q-footer bordered class="bg-teal-14 text-blue-grey-10">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const leftDrawerOpen = ref(false);
const text = ref<string>('');
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
// 滾動到頂部
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 滾動到底部
const scrollToBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
};
</script>
<style scoped>
.black-border {
  border: 10px black solid;
}
</style>
