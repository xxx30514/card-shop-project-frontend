<template>
  <h1>{{ count }}</h1>
  <h1 class="color">{{ double }}</h1>
  <h1 class="color">{{ flag }}</h1>
  <button @click="add">add</button>
  <button @click="$q.dark.toggle()">change</button>
  <button @click="change">change2</button>
  <button @click="toIndex">To Index</button>
  <button @click="getAll">API Test</button>
  <a href="http://localhost:9000/">123</a>
  {{ $s.leftDrawerOpen }}
  {{ pagination.currentPage }}
  <tr v-for="(item, index) in dataList" :key="item.empId">
    <td>{{ item.empId }}</td>
    <td>{{ item.empName }}</td>
  </tr>
  <h1>分隔線</h1>
  <img
    class="col-md-12"
    :src="'http://localhost/image/No-Image-Placeholder.svg.png'"
    alt="..."
  />
  <tr v-for="(item, index) in dataList2.lists" :key="item.empId">
    <td>{{ item.empId }}</td>
    <td>{{ item.empName }}</td>
    <!-- <td>{{ index }}</td> -->
  </tr>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, reactive, toRefs } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useLayoutStore } from 'src/stores/layout';
import axios from 'axios';
import { api } from 'src/boot/axios';

let pagination = reactive({
  currentPage: 1, //當前頁
  pageSize: 10, //每頁顯示幾筆
  total: 0, //資料總筆數
  pages: 0, //總頁數
  empName: '',
  empAge: '',
  empGender: '',
});
let param = ref();
let length = ref();
const dataList = ref();
const dataList2: any = reactive({ lists: [] });
//const dataList3: any = reactive([]);

function getAll() {
  //查詢所有資料並進行分頁
  param.value = '?query';
  param.value += '&empName=' + pagination.empName;
  param.value += '&empAge=' + pagination.empAge;
  param.value += '&empGender=' + pagination.empGender;
  api
    .get(
      '/emps/' +
        pagination.currentPage +
        '/' +
        pagination.pageSize +
        param.value,
    )
    .then((response) => {
      //成功時執行的回調函數
      console.log(response.data);
      console.log(response.data.data.records.length);
      console.log(response.data.data.records[0]);
      console.log(response.data.data);
      console.log(response.data.data.records);
      pagination.currentPage = response.data.data.current;
      pagination.pageSize = response.data.data.size;
      pagination.total = response.data.data.total;
      pagination.pages = response.data.data.pages;
      dataList.value = response.data.data.records;
      dataList2.lists = response.data.data.records;
      length.value = response.data.data.length;
      window.sessionStorage.setItem('name', pagination.empName);
      window.sessionStorage.setItem('age', pagination.empAge);
    });
}
getAll();
const $q = useQuasar();
const $router = useRouter();
const $s = useLayoutStore();
/*TODO: codingStyle
1.import 組件ex. const $q = useQuasar();
2.自訂變數
3.computed
4.function
5.watch
6.生命週期相關onMounted
*/
const count = ref(0); //變數宣告要在最前面 否則會有初始化錯誤的問題
function add() {
  count.value++;
}
const color = ref('red');
const flag = ref(true);
console.log('是否開啟黑暗模式' + $q.dark.isActive);
function mode() {
  // localStorage 只能儲存字串 JSON.stringify=>物件轉字串   JSON.parse=>字串轉物件
  const mode = window.localStorage.getItem('mode');
  if (mode) {
    flag.value = JSON.parse(mode);
    console.log('flag值' + flag.value);
    // $q.dark.set(mode);
    // $q.dark.set(flag.value);
  }
}
function change() {
  // $q.dark.toggle();
  console.log($q.dark.isActive);
  if ($q.dark.isActive === false) {
    $q.dark.set(true);
    // flag.value = true;
    flag.value = true;
    console.log(flag.value + '00');
    localStorage.setItem('mode', JSON.stringify(flag.value));
    console.log(Boolean(localStorage.getItem('mode')));
  } else {
    $q.dark.set(false);
    // flag.value = false;
    flag.value = false;
    localStorage.setItem('mode', JSON.stringify(flag.value));
  }
}
const double = computed(() => {
  return count.value * 2;
});
function toIndex() {
  $router.push('/');
}
const hello = () => {
  //參數只有一個時，參數的括號可以省略
  //若{}內有回傳值時要自己return
  const obj = { cat: 1, brother: '豪豪' };
  obj.cat = 2;
  console.log(obj);
  console.log('hi');
};
//只有一行時，可省略大括號和return
const hello2 = () => console.log('hi');
//要直接 return 物件時 要用()包住物件
//const myHome = () => reactive({ dog: 1, brother: '豪豪' });
hello();
hello2();
const myHome = reactive({ dog: 1, brother: '豪豪' });
//解構
const { dog, brother } = toRefs(myHome);
console.log(myHome);
function changeMyHome() {
  //要直接修改整個reactive物件需要使用Object.assign重新指派
  Object.assign(myHome, { dog: 2, brother: '土土' });
}
changeMyHome();
console.log(myHome);
function changeMyHome2() {
  dog.value = 3;
  brother.value = '土豪';
}
changeMyHome2();
console.log(myHome);
//function (newV, old) == (newV, old)=>
//TODO: ref可監聽基本型別 要監聽物件需要deep:true   reactive可監聽物件與陣列
watch(
  count,
  function (newValue, oldValue) {
    console.log(count.value);
    console.log(newValue);
    console.log(oldValue + '舊');
    if (count.value % 2 === 0) {
      color.value = 'red';
    } else {
      color.value = 'green';
    }
  },
  { deep: true },
);
watch(
  double,
  (newValue, oldValue) => {
    console.log(oldValue);
    console.log(newValue);
  },
  { deep: true },
);
onMounted(() => {
  mode();
  $q.dark.set(flag.value);
  // const mode = window.localStorage.getItem("mode");
  // if (mode) {
  //   flag.value = JSON.parse(mode);
  //   // $q.dark.set(mode);
  //   $q.dark.set(flag.value);
  // }
});
</script>

<style>
.color {
  color: v-bind(color);
}
</style>
