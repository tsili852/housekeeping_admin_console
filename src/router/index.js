import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Repairs from '@/components/Repairs/Repairs'
import Housekeeping from '@/components/Housekeeping/Housekeeping'
import Settings from '@/components/Settings/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/repairs',
      name: 'Repairs',
      component: Repairs
    },
    {
      path: '/housekeeping',
      name: 'Housekeeing',
      component: Housekeeping
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ],
  mode: 'history'
})
