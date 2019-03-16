import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddAds from '@/components/AddAds'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
     {
      path: '/newads',
      name: 'AddAds',
      component: AddAds
    },
    
  ]
})
