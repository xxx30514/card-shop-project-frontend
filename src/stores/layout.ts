import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    leftDrawerOpen: true,
    headOpen: true,
  }),

  getters: {
    doubleCount(state) {
      return state.leftDrawerOpen;
    },
  },

  actions: {
    toggleLeftDraw() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    toggleHeadDraw() {
      this.headOpen = !this.headOpen;
    },
  },
});
