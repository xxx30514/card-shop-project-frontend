import { defineStore } from 'pinia';

export const useCountStore = defineStore('count', {
  //儲存的資料
  state: () => ({
    sum: Number(localStorage.getItem('sum')),
    //sum: JSON.parse(localStorage.getItem('sum') as string) || 1,
    data: '1231564',
    city: '新北市',
  }),

  getters: {
    doubleCount(): number {
      return this.sum * 2;
    },
    bigSum: (state): number => {
      return state.sum * 10;
    },
  },
  //方法 複雜邏輯的程式碼複用
  actions: {
    increment(value: number) {
      if (this.sum < 10) {
        //修改資料 this=當前的state
        this.sum += value;
      }
    },
  },
});
