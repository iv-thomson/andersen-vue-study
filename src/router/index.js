import { createRouter, createWebHistory } from 'vue-router'

// Check how to add new routes here: https://router.vuejs.org/

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'activity-log',
    },
    {
      path: '/activity-log',
      name: 'activity-log',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ActivityLogView.vue'),
    },
    {
      path: '/data-usage',
      name: 'data-usage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DataUsageView.vue'),
    },
    {
      path: '/asset-management',
      name: 'asset-management',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AssetManagementView.vue'),
    },
    {
      path: '/service-ticket-reporting',
      name: 'service-ticket-reporting',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ServiceTicketReportingView.vue'),
    },
    {
      path: '/spare-hardware',
      name: 'spare-hardware',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SpareHardware.vue'),
    },
  ],
})

export default router
