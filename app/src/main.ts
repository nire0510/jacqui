import { createApp } from 'vue';
import 'materialize-css/dist/css/materialize.css'
import M from 'materialize-css';
import App from '@/app.vue';
import router from '@/router';
import store from '@/store'
import copy from '@/components/directives/copy';

M.AutoInit();

createApp(App)
  .use(store)
  .use(router)
  .directive('copy', copy)
  .mount('#app');
