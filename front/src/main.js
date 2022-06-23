import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router/index'
import axios from 'axios'
import config from '@/configs'
import api from '@/api'

const app = createApp(App);
app.use(store)
app.use(router)
app.mount("#app");


axios.defaults.withCredentials = true
axios.defaults.headers.common['Accept'] = 'application/json'

api.get(config.url + 'auth').then(response => {
  if (response.record.length !== 0) {
    store.commit('setUser', response.record)
  }
})
