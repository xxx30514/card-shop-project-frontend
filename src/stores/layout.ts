import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  //儲存資料的位置
  state: () => ({
    leftDrawerOpen: true,
    headOpen: true,
    testStorage: JSON.parse(localStorage.getItem('flag') as string) || true,
  }),
  //類似computed屬性
  getters: {
    doubleCount(state) {
      return state.leftDrawerOpen;
    },
    doubleCount2(): boolean {
      return this.leftDrawerOpen;
    },
    sum: (state) => {
      return state.leftDrawerOpen;
    },
  },
  //儲存的方法
  actions: {
    toggleLeftDraw() {
      //this是指此store中的資料
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleHeadDraw() {
      this.headOpen = !this.headOpen;
    },
  },
});
