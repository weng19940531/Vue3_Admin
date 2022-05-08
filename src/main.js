import { createApp } from 'vue'
import App from './App.vue'
import i18n from '@/locale'
import store from '@/store'
import router from '@/router'

createApp(App).use(i18n).use(store).use(router).mount('#app')
