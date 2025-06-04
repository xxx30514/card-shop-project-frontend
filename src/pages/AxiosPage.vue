<template>
  <div v-if="user">
    <p>歡迎，{{ user.name }}</p>
    <p>Email: {{ user.email }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUserInfo, updateUserName, type UserInfo } from 'src/api/test';

// 定義 user 的型別為 UserInfo 或 null（因為初始為 null）
const user = ref<UserInfo | null>(null);

// 非同步函式取得使用者資料
const fetchUser = async () => {
  try {
    const data = await getUserInfo();
    user.value = data;
  } catch (err) {
    console.error('取得使用者資料失敗', err);
  }
};

onMounted(fetchUser);
</script>
