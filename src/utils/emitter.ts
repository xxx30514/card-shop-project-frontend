//匯入mitt
import mitt from 'mitt';
//呼叫mitt函式 得到常數emitter emitter能綁定事件與觸發事件
const emitter = mitt();
/*
//事件綁定
emitter.on('test1', () => {
  console.log('test1被呼叫了');
});
emitter.on('test2', () => {
  console.log('test2被呼叫了');
});
setInterval(() => {
  //觸發事件
  emitter.emit('test1');
  emitter.emit('test2');
}, 1000);
setTimeout(() => {
  //解除事件綁定
  emitter.off('test1');
  emitter.off('test2');
  //全部清空
  //emitter.all.clear();
}, 3000);
*/
//匯出mitt
export default emitter;
