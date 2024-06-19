import { boot } from 'quasar/wrappers';
import HelloComponent from 'src/components/HelloComponent.vue';
export default boot(({ app }) => {
  app.component('hello-component', HelloComponent);
  app.directive('my-style', (element, { value }) => {
    element.innerText += value;
    element.style.color = 'blue';
    element.style.backgroundColor = 'yellow';
  });
  app.directive('my-style-2', (element) => {
    element.style.color = 'blue';
    element.style.backgroundColor = 'pink';
  });
});
