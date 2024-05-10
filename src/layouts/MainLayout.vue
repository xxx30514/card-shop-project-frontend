<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="$s.toggleLeftDraw" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="$s.leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      {{ leftDrawerOpen }}
      <router-link to="/hook" active-class="bg-positive">hook.vue</router-link>
      <router-link to="/set" active-class="bg-positive">set.vue</router-link>
      <router-link to="/hook" active-class="bg-positive">
        <q-btn label="hook" outline color="primary" no-caps />
      </router-link>
      <router-link :to="{ path: '/set' }" active-class="bg-positive">
        <q-btn label="set" outline color="primary" no-caps />
      </router-link>
      <router-link :to="{ name: 'hook' }" active-class="bg-positive">
        <q-btn label="hook2" outline color="primary" no-caps />
      </router-link>
      <q-btn
        replace
        to="/hook"
        :class="{ 'bg-light-blue text-yellow-10': $route.name === 'hook' }"
        label="Link to hook"
      ></q-btn>
      <q-btn
        :to="{
          name: 'detail',
          //query: { id: news.id, title: news.title },
        }"
        :class="{ 'bg-light-blue text-yellow-10': $route.name === 'detail' }"
        label="Link to detail"
      ></q-btn>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useLayoutStore } from 'src/stores/layout';
import { storeToRefs } from 'pinia';
const $s = useLayoutStore();
//解構使用 可以將陣列或者物件裡面的資料解開變成獨立的變數
const { leftDrawerOpen } = storeToRefs($s);
console.log(leftDrawerOpen.value);
console.log($s.leftDrawerOpen);
const { toggleLeftDraw } = $s;
const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];
</script>
