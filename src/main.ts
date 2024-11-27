import './assets/main.css'
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Toast, {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
});

app.use(createPinia())
app.use(router)

app.mount('#app')
