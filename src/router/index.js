import { createRouter, createWebHistory } from 'vue-router'
import LayoutAdmin from '../layout/wrapper/Admin/layoutAdmin.vue'
import AdminDashboard from '../pages/admin/dashboard/index.vue'
import PTDashboard from '../pages/pt/dashboard/index.vue'
import ClientDashboard from '../pages/client/dashboard/index.vue'
import ClientSchedule from '../pages/client/schedule/index.vue'
import ClientPT from '../pages/client/datlich/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/admin',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: AdminDashboard
      }
    ]
  },
  {
    path: '/pt',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        name: 'PTDashboard',
        component: PTDashboard
      }
    ]
  },
  {
    path: '/client',
    component: LayoutAdmin,
    children: [
      {
        path: '',
        name: 'ClientDashboard',
        component: ClientDashboard
      },
      {
        path: 'schedule',
        name: 'ClientSchedule',
        component: ClientSchedule
      },
      {
        path: 'pt',
        name: 'ClientPT',
        component: ClientPT
      },
      {
        path: 'meals',
        name: 'ClientMeals',
        component: ClientDashboard
      },
      {
        path: 'billing',
        name: 'ClientBilling',
        component: ClientDashboard
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
