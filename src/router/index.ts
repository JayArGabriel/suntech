import { createRouter, createWebHistory } from 'vue-router';
import AppView from '@/views/AppView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'app',
      component: AppView,
      children: [
        {
          path: '',
          name: 'home',
          // route level code-splitting
          // this generates a separate chunk (HomePage.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/components/views/index.vue')
        }
      ]
    },
    { // For 404 Page
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: { path: '/' }
      // component: () => import(/* webpackChunkName: "template" */ '@/views/PathNotFound')
    }
  ]
})

export default router
