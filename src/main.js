import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Quill Settings
import Vue3Quill from 'vue3-quill'
import 'quill/dist/quill.snow.css'


createApp(App)
.use(Vue3Quill)
.mount('#app')
