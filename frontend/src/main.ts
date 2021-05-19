import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.css'
import store from './store'

M.AutoInit();

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
