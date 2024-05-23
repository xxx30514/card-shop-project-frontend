import { defineStore } from 'pinia';

export const useStringStore = defineStore('string', {
  state: () => ({
    stringList: [
      { id: 1, title: '字串1' },
      { id: 2, title: '字串2' },
      { id: 3, title: '字串3' },
    ],
  }),

  getters: {},

  actions: {
    getString() {
      const obj = { id: 4, title: '字串4' };
      this.stringList.push(obj);
    },
  },
});
