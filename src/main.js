// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Vuetify from 'vuetify'
import VueLodash from 'vue-lodash'

import 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'

// router setup
import routes from './routes/routes'

// Plugins
import GlobalComponents from './globalComponents'
import GlobalDirectives from './globalDirectives'
import Notifications from './components/NotificationPlugin'

// MaterialDashboard plugin
import MaterialDashboard from './material-dashboard'

import Chartist from 'chartist'

import store from '@/store'

import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '@/config/firebase'

import awesomeConfig from '@/config/fontawesome'

awesomeConfig.setup()

firebase.initializeApp(firebaseConfig)
firebase.firestore().enablePersistence()
  .then(function () {
    console.log('persistence enabled')
  })
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      console.error('Multiple tabs open, persistence can only be enabled in one tab at a a time.')
    } else if (err.code === 'unimplemented') {
      console.error('The current browser does not support all of the features required to enable persistence.')
    }
  })

export const db = firebase.firestore()

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: 'nav-item active',
  mode: 'history'
})

const options = { name: 'lodash' }
Vue.use(VueLodash, options)

Vue.use(VueRouter)
Vue.use(MaterialDashboard)
Vue.use(GlobalComponents)
Vue.use(GlobalDirectives)
Vue.use(Notifications)
Vue.use(Vuetify)

// global library setup
Object.defineProperty(Vue.prototype, '$Chartist', {
  get () {
    return this.$root.Chartist
  }
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .then(function () {
        console.log('ServiceWorker registered')
      })
      .catch(function (error) {
        console.log('ServiceWorker failed!', error)
      })
  })
} else {
  console.log('nada de nada')
}

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  }
})

global.vm = vm
