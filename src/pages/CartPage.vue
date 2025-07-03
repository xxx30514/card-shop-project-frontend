<template>
  <q-page>
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">購物車</div>
      </q-card-section>
    </q-card>

    <q-list bordered v-if="cartItems.length > 0">
      <q-item v-for="(item, index) in cartItems" :key="index" clickable class="black-border">
        <q-item-section class="col-4 black-border">{{ item.productName }} </q-item-section>
        <!-- <q-item-section> 小計:{{ getItemTotal(item) }} </q-item-section> -->
        <!-- 可能顯示單價即可 還未定案 -->
        <q-item-section @click="toggleItemSelection(item)" class="black-border">
          <q-checkbox v-model="item.selected" :label="item.productName" :left-label="true" :disable="item.stock <= 0" />
        </q-item-section>
        <q-item-section class="col-auto">
          <q-btn @click.stop="removeItem(index)" icon="delete" color="negative" round dense />
        </q-item-section>
        <q-item-section side>
          <div class="row items-center q-gutter-md">
            <q-btn icon="remove" round dense color="primary" @click="item.number--" :disable="item.number <= 1" />
            <q-input
              v-model.number="item.number"
              type="number"
              min="1"
              max="99"
              style="width: 60px"
              dense
              outlined
              input-class="text-center"
              @keydown="onKeyDown"
              @input="onInput(item)"
            />
            <q-btn icon="add" round dense color="primary" @click="item.number++" :disable="item.number >= 99" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator />

    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">總價: {{ totalPrice }} 元</div>
      </q-card-section>

      <q-card-actions>
        <q-btn @click="clearCart" label="清空購物車" color="secondary" />
        <q-btn @click="checkout" label="結帳" color="primary" />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="dialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">購物車清單</div>
          <div v-if="cartItems.length === 0" class="text-center q-mt-md">購物車為空</div>
          <q-list v-else>
            <q-item v-for="(item, index) in cartItems" :key="index">
              <q-item-section> {{ item.productName }} - {{ item.number }} 件 </q-item-section>
              <q-item-section side> {{ item.amount }} 元 </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions>
          <q-btn label="關閉" color="primary" @click="dialogOpen = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMeta } from 'quasar';
// 定義資料
interface Item {
  productName: string;
  number: number;
  amount: number;
  stock: number;
  selected: boolean;
}
const cartItems = ref<Item[]>([
  { productName: '商品 1', number: 2, amount: 500, stock: 10, selected: true },
  { productName: '商品 2', number: 1, amount: 300, stock: 5, selected: false },
  { productName: '商品 3', number: 1, amount: 150, stock: 0, selected: true },
]);
const dialogOpen = ref(false);

// 計算各項金額
function getItemTotal(item: Item) {
  return item.amount * item.number;
}
// 計算總金額
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return item.selected ? total + item.amount * item.number : total;
  }, 0);
});
const totalPrice = computed(() => Math.round(subtotal.value));
// 方法: 切換商品選擇狀態
function toggleItemSelection(item: Item) {
  item.selected = !item.selected;
}
// 方法: 移除商品
function removeItem(index: number) {
  cartItems.value.splice(index, 1);
}
// 方法: 清空購物車
function clearCart() {
  cartItems.value = [];
}
// 方法: 結帳
function checkout() {
  console.log('結帳');
}

// 防止使用者輸入非數字鍵
function onKeyDown(e: KeyboardEvent) {
  if (!['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key) && !/^\d$/.test(e.key)) {
    e.preventDefault();
  }
}
function onInput(item: Item) {
  if (typeof item.number !== 'number' || isNaN(item.number)) {
    item.number = 1; // 預設最小值
    return;
  }
  if (item.number < 1) item.number = 1;
  else if (item.number > 99) item.number = 99;
}
// 設定網頁標題
const metaData = {
  // sets document title
  title: '購物車',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
};
useMeta(metaData);
</script>

<style scoped>
.q-page {
  padding: 20px;
}
.black-border {
  border: 5px black solid;
}
</style>
