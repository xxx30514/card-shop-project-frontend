<template>
  <q-page>
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">購物車</div>
      </q-card-section>
    </q-card>

    <q-list bordered v-if="cartItems.length > 0">
      <q-item v-for="(item, index) in cartItems" :key="index" clickable @click="toggleItemSelection(item)">
        {{ item.productName }}
        <q-item-section>
          <q-checkbox v-model="item.selected" :label="item.productName" :left-label="true" :disable="item.stock <= 0" />
        </q-item-section>

        <q-item-section side>
          <q-btn @click.stop="removeItem(index)" icon="delete" color="negative" round dense />
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator />

    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">總價: {{ totalPrice.toFixed(2) }} 元</div>
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
// 計算總金額
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => (item.selected ? total + item.amount : total), 0);
});
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
</style>
