import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddAds from '@/components/AddAds'
import Categorie from '@/components/Categorie'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/newads',
    name: 'AddAds',
    component: AddAds
  },
  {
    path: '/categorie/:id',
    name: 'Categorie',
    component: Categorie
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  }

  ]
})
