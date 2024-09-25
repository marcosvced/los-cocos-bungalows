import Booking from '@/features/booking/presentation/ui/pages/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/booking',
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking,
    },
  ],
})

export default router
