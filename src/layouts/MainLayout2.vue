<template>
  <q-layout view="hHh LpR fff">
    <q-header class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" overlay dark>
      <p>123</p>
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
        <q-page-scroller reverse position="top-right" :scroll-offset="30" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_down" color="secondary"
            ><q-tooltip class="bg-indigo text-body2">回到底部</q-tooltip></q-btn
          >
        </q-page-scroller>
        <router-view />
        <q-page-scroller position="bottom-right" :scroll-offset="200" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="secondary"
            ><q-tooltip class="bg-indigo text-body2">回到頂部</q-tooltip></q-btn
          >
        </q-page-scroller>
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

    <q-footer bordered class="bg-grey-8 text-white">
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
import { useRoute, onBeforeRouteUpdate } from 'vue-router';

const leftDrawerOpen = ref(false);

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
const route = useRoute();

onBeforeRouteUpdate(() => {
  document.title = (route.meta.title as string) || 'Default Title';
});
</script>
