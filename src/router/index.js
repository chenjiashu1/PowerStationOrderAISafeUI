import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'monitor',
        name: 'Monitor',
        component: Dashboard
      },
      {
        path: 'emergency',
        name: 'Emergency',
        component: Dashboard
      },
      {
        path: 'warning',
        name: 'Warning',
        component: Dashboard
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Dashboard
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('isAuthenticated')) {
    next('/login')
  } else {
    next()
  }
})

export default router
