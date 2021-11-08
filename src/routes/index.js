import { createRouter, createWebHistory } from 'vue-router'

import BeforeWS from '~/components/BeforeWS'
import ContentView from './ContentView'


export default createRouter({
  history:createWebHistory(),
  routes: [
    {
      path: '/',
      component: BeforeWS
    },
    {
      name: 'view',
      path: '/:id',
      component: ContentView
    },
  ]
})
