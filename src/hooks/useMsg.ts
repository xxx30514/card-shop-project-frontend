import { ref, customRef } from 'vue';
export default function (initValue: string, delayTime: number) {
  let timer: NodeJS.Timeout;
  const test = ref('test');
  const msg = customRef((track, trigger) => {
    return {
      //讀取msg資料時呼叫
      get(): string {
        track(); //對msg持續追蹤 一但msg變化就立即更新
        return initValue;
      },
      //msg資料更新時呼叫
      set(value) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          initValue = value;
          trigger(); //告知vue msg的資料發生變化
        }, delayTime);
      },
    };
  });
  return { msg, test };
}
function abc(initValue: string, delayTime: number) {
  let timer: NodeJS.Timeout;
  const msg = customRef((track, trigger) => {
    return {
      //讀取msg資料時呼叫
      get(): string {
        track(); //對msg持續追蹤 一但msg變化就立即更新
        return initValue;
      },
      //msg資料更新時呼叫
      set(value) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          initValue = value;
          trigger(); //告知vue msg的資料發生變化
        }, delayTime);
      },
    };
  });
  return { msg };
}
export { abc };
