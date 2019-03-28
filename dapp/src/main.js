// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import {store} from './store/'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css';

 
import vSelect from 'vue-select'

import FlagIcon from 'vue-flag-icon'


library.add(fab,fas)

/** Fixes for Chrome */
import "setimmediate"

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueTelInput)
Vue.use(FlagIcon);
Vue.use(require('vue-moment'))
 
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
