import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/css/reset.less'
import Vant from 'vant';
import 'vant/lib/index.css';
import { createPinia } from 'pinia'
const store = createPinia()

createApp(App).use(router).use(Vant).use(store).mount('#app')