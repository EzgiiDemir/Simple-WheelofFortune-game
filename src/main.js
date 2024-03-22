// main.js

import { createApp } from 'vue'
import App from './App.vue'
import $ from 'jquery'

// jQuery'yi Vue bileşenlerine eklemek için window objesine bağlayın
window.$ = $
window.jQuery = $

createApp(App).mount('#app')
