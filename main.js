
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import './components/interceptor.js'
import { request } from './components/request.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

uni.$request = request

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
