import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Welcome from '../views/Welcome.vue'
import OrderList from '../views/OrderList.vue'
import OrderDetail from '../views/OrderDetail.vue'
import KnowledgeBase from '../views/KnowledgeBase.vue'

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
        path: '',
        name: 'Welcome',
        component: Welcome,
        meta: { title: '首页' }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: OrderList,
        meta: { title: '订单管理' }
      },
      {
        path: 'knowledge-base',
        name: 'Knowledge-base',
        component: KnowledgeBase,
        meta: { title: '知识库' }
      },
      {
        path: 'order-detail/:orderNo',
        name: 'OrderDetail',
        component: OrderDetail,
        meta: { title: '订单详情' },
        props: true
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