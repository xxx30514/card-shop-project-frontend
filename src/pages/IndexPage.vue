<template>
  <q-page class="row items-center justify-evenly">
    <example-component title="Example component" active :todos="todos" :meta="meta"></example-component>
    <modal-component></modal-component>
    <button @click="test">測試失敗</button>
    <button @click="getEmail">測試</button>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import ModalComponent from 'components/ModalComponent.vue';
import { ref } from 'vue';
import { api } from 'src/api/axios2';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);
const meta = ref<Meta>({
  totalCount: 1200,
});
const router = useRouter();
const email = ref('1234@meatkay.com.tw');
const test = async () => {
  try {
    const res = await api.post('/auth/email', email.value, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    console.log(res);
  } catch (err: unknown) {
    if (err instanceof Error && err.message === '未登入') {
      Swal.fire({
        icon: 'warning',
        title: '尚未登入',
        text: '請先登入後再操作',
        confirmButtonText: '前往登入',
        cancelButtonText: '取消',
        showCancelButton: true,
        showCloseButton: true,
        //allowOutsideClick: false, //加上此屬性一定要按取消才能關閉視窗
        customClass: {
          // confirmButton: 'q-btn q-btn--standard text-white bg-primary',
          cancelButton: 'text-white bg-negative',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/login');
        }
      });
    }
  }
};
// interface ApiResponse<T> {
//   code?: string;
//   msg?: string;
//   data?: T;
//   total?: bigint;
// }

const getEmail = async () => {
  try {
    const res = await api.get('/auth/' + email.value);
    console.log(res);
    console.log(res.data);
    console.log(res.data.data);
    console.log(res.data.data.id);
    console.log(res.data.msg);
    console.log(res.data.code);
    console.log(res.status);
  } catch (err: unknown) {
    console.log(err);
  }
};
</script>
