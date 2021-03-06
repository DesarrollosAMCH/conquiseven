import Vue from 'vue'
import Vuex from 'vuex'

import ClubesModule from '@/modules/clubes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    processing: false,
    loaded: false,
    alert: {
      type: 'success',
      show: false,
      message: ''
    },
    activity: null
  },
  mutations: {
    setActivity: (state, newVal) => {
      state.activity = newVal
    },
    setLoaded: (state, loaded) => {
      state.loaded = loaded
    },
    setAlertMessage: (state, data) => {
      state.alert.type = data.type
      state.alert.show = data.show
      state.alert.message = data.message
      setTimeout(() => {
        state.alert.type = 'success'
        state.alert.show = false
        state.alert.message = ''
      }, data.timeout)
    }
  },
  modules: {
    ClubesModule
  }
})
