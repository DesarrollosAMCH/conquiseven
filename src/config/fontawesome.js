import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faFlag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  setup: () => {
    library.add(faCoffee)
    library.add(faFlag)
    Vue.component('font-awesome-icon', FontAwesomeIcon)
    Vue.config.productionTip = false
  }
}
