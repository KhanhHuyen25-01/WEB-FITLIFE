import { createRouter, createWebHistory } from 'vue-router'
import LayoutAdmin from '../layout/wrapper/Admin/layoutAdmin.vue'
import AdminDashboard from '../pages/admin/dashboard/index.vue'
import PTDashboard from '../pages/pt/dashboard/index.vue'
import ClientDashboard from '../pages/client/dashboard/index.vue'

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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
