import { boot } from 'quasar/wrappers';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
declare module 'vue' {
  interface ComponentCustomProperties {
    $base_url: string;
  }
}
export default boot(({ app }) => {
  app.config.globalProperties.$base_url = 'http://localhost/';
});
