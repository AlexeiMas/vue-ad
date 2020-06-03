import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import BuyModalComponent from './components/Shared/BuyModal'
import * as fb from 'firebase'
import './sass/main.sass'

Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App),
  created: function () {
    fb.initializeApp({
      apiKey: 'AIzaSyDppzPe7FtdAqrVvBNXBUrBndp2S8r2Ag0',
      authDomain: 'itc-ads-89869.firebaseapp.com',
      databaseURL: 'https://itc-ads-89869.firebaseio.com',
      projectId: 'itc-ads-89869',
      storageBucket: 'itc-ads-89869.appspot.com',
      messagingSenderId: '170448956958',
      appId: '1:170448956958:web:8fa4d539e538468a57480f'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
