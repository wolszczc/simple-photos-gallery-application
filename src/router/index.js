import Vue from 'vue'
import Router from 'vue-router'
import Gallery from '@/pages/gallery'
import UserGallery from '@/pages/user-gallery'

Vue.use(Router)

const router = new Router({
  saveScrollPosition: false,
  history: false,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Gallery
    },
    {
      path: '/user/gallery/:id',
      name: 'user-gallery',
      component: UserGallery
    }
  ]
})

export default router
