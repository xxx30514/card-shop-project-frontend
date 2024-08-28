<template>
  <h1>{{ count }}</h1>
  <h1 class="color">{{ double }}</h1>
  <h1 class="color">{{ flag }}</h1>
  <button @click="add">add</button>
  <button @click="$q.dark.toggle()">change</button>
  <button @click="change">change2</button>
  <button @click="toIndex">To Index</button>
  <a>To Index</a>
  <button @click="getAll">API Test</button>
  <a href="http://localhost:9000/">123</a>
  <hr />
  <p>姓名{{ person.name }}</p>
  <p>年齡{{ person.age }}</p>
  <p>物件{{ person }}</p>
  <button @click="changeName">改名</button>
  <button @click="changeAge">改年齡</button>
  <button @click="changePerson">改物件</button>
  <h1 ref="data">123</h1>
  <button @click="showRef">Ref標籤</button>
  Store:{{ $s.leftDrawerOpen }} Store2:{{ leftDrawerOpen }}
  <button @click="changeStore">修改</button>
  <button @click="changeStorePatch">批量修改</button>
  <button @click="toggleLeftDraw">action修改</button>
  {{ pagination.currentPage }}
  <tr v-for="(item, index) in dataList" :key="item.empId">
    <td>{{ item.empId }}</td>
    <td>{{ item.empName }}</td>
  </tr>
  <ul>
    <li v-for="item in list" :key="item.id">ID:{{ item.id }} 姓名:{{ item.name }} 年齡:{{ item.age }}</li>
  </ul>
  <h1>分隔線</h1>
  <img class="col-md-2" src="~assets/No-Image-Placeholder.png" alt="..." />
  <img class="col-md-2" src="/favicon.ico" alt="..." />
  <tr v-for="(item, index) in dataList2.lists" :key="item.empId">
    <td>{{ item.empId }}</td>
    <td>{{ item.empName }}</td>
    <!-- <td>{{ index }}</td> -->
  </tr>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, reactive, toRefs, watchEffect } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useLayoutStore } from 'src/stores/layout';
import axios from 'axios';
import { api } from 'src/boot/axios';
import { type Person, type Persons } from 'src/types/interface';
import { storeToRefs } from 'pinia';
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
const personList: Persons = [{ id: 1, name: '123', age: 10 }];
const personList2 = reactive<Persons>([{ id: 1, name: '123', age: 10 }]);
//接收父組件的props list
//defineProps(['list']);
//接收父組件的props 並保存
//let x = defineProps(['list']);
//接收父組件的props並限制型別
//defineProps<{ list: Persons }>();
//defineProps<{ list?: Persons }>();
//接收父組件的props+限制型別+限制必要性+指定預設值 若父組件沒傳遞list props 會使用預設值
withDefaults(defineProps<{ list?: Persons }>(), { list: () => [{ id: 1, name: '老五', age: 50 }] });
function getAll() {
  //查詢所有資料並進行分頁
  param.value = '?query';
  param.value += '&empName=' + pagination.empName;
  param.value += '&empAge=' + pagination.empAge;
  param.value += '&empGender=' + pagination.empGender;
  api
    .get('/emps/' + pagination.currentPage + '/' + pagination.pageSize + param.value)
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
    })
    .catch((error) => {
      console.log(error);
    });
}
/*
async function getUser(){
    try{
        const response = await axios.get('');
        console.log(response);
    }catch(error){
        console.log(error)
    }
}
*/
getAll();
const $q = useQuasar();
const $router = useRouter();
const $s = useLayoutStore();
console.log($s.leftDrawerOpen);
//第一種修改方式
function changeStore() {
  $s.leftDrawerOpen = !$s.leftDrawerOpen;
}
//第二種修改方式 批量修改
function changeStorePatch() {
  $s.$patch({ headOpen: !$s.headOpen, leftDrawerOpen: !$s.leftDrawerOpen });
}
//第三種修改方式 action
function toggleLeftDraw() {
  $s.toggleLeftDraw();
}
//響應式解構store
const { leftDrawerOpen } = storeToRefs($s);
//store的監聽器
$s.$subscribe((mutate, state) => {
  console.log('資料發生變化', mutate, state);
  localStorage.setItem('flag', JSON.stringify(state.leftDrawerOpen));
});
//若需要用到this $s.$subscribe(function () {});
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
//簡寫computed屬性 僅能獲取 不能set
const double = computed(() => {
  return count.value * 2;
});
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
computed({
  get() {
    return 123;
  },
  set() {},
});

computed(function () {
  return 123;
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
//響應式解構 reactive=>ref
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
/*TODO:
watch : ref可監聽基本型別 要監聽物件內屬性變化需要deep:true   reactive可監聽物件與陣列
watch 可監聽 ref / reactive / array / getter function
*/
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
const watchCount = watch(count, (newValue, oldValue) => {
  console.log('count變化', newValue, oldValue);
  if (newValue >= 5) {
    watchCount(); //停止監聽器
  }
});
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
const person = ref({ name: '小明', age: 20 });
function changeName() {
  person.value.name = '老明';
}
function changeAge() {
  person.value.age = 40;
}
function changePerson() {
  person.value = { name: '老五', age: 50 };
}
/*
修改物件內的屬性時 新舊值相同 修改整個物件時 新舊值不同
watch的三個參數 1.被監聽的資料 2.監聽器的回呼函式 3.監聽器的配置ex.deep、immediate...
*/
watch(
  person,
  (newValue, oldValue) => {
    console.log('person變化', newValue, oldValue);
  },
  { deep: true },
);
const objWatch = reactive({
  name: '小明',
  age: 20,
  car: { car1: '本田', car2: '豐田' },
});
/*
若要監聽reactive或ref物件中的特定屬性 需要使用getter函式
若該屬性為物件類型 可以直接編寫objWatch.car 但建議使用getter函式與deep:true
直接編寫時若直接改變物件 會無法監聽
*/
watch(
  () => objWatch.name, //{return objWatch.name} 僅一行可省略{}與return
  (newValue, oldValue) => {
    console.log('name變化', newValue, oldValue);
  },
);

watch(objWatch.car, (newValue, oldValue) => {
  console.log('car變化', newValue, oldValue);
}); //預設監聽的是物件的記憶體位址 若僅改變car.car1或car.car2 可監聽  但改變整個car時無法監聽

watch(
  () => objWatch.car,
  (newValue, oldValue) => {
    console.log('car變化', newValue, oldValue);
  },
  { deep: true },
); // 推薦使用 可完整監聽整個物件的變化
//監聽多個資料時的寫法
watch([() => objWatch.name, () => objWatch.car.car1, objWatch.car], () => {});
//不用明確指定要監聽的資料 直接監聽使用的屬性
watchEffect(() => {
  if (objWatch.age > 30) {
    console.log('watchEffect測試');
  }
});
//ref 用於html標籤上 取得DOM節點 <h1 ref="data"></h1>
let data = ref();
function showRef() {
  console.log(data.value);
}
let c = ref(1);
//ref 用於組件上  取得組件物件實例 父組件要取得子組件內容 需要defineExpose
defineExpose({ data, count, c });
//ts可定義this類型
interface Obj {
  user: number[];
  add: (this: Obj, num: number) => void;
}
let obj: Obj = {
  user: [1, 2, 3],
  add(this: Obj, num: number) {
    this.user.push(num);
  },
};
obj.add(4);
console.log(obj.user);
</script>

<style scoped>
.color {
  color: v-bind(color);
}
</style>
