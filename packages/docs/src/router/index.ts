import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: 'basic',
    component: () => import('@/examples/basic.vue'),
    meta: {
      title: 'basic'
    }
  },
  {
    path: 'slot',
    component: () => import('@/examples/slot.vue'),
    meta: {
      title: 'slot'
    }
  },
  {
    path: 'info',
    component: () => import('@/examples/info.vue'),
    meta: {
      title: 'info'
    }
  },
  
  {
    path: 'chart',
    component: () => import('@/examples/chart.vue'),
    meta: {
      title: 'chart'
    }
  },
  {
    path: 'grid',
    component: () => import('@/examples/grid.vue'),
    meta: {
      title: 'grid'
    }
  },
  {
    path: 'markline',
    component: () => import('@/examples/markline.vue'),
    meta: {
      title: 'markline'
    }
  },
  {
    path: 'group',
    component: () => import('@/examples/group.vue'),
    meta: {
      title: 'group'
    }
  },
  {
    path: 'menu',
    component: () => import('@/examples/menu.vue'),
    meta: {
      title: 'menu'
    }
  },
  {
    path: 'snap',
    component: () => import('@/examples/snap.vue'),
    meta: {
      title: 'snap'
    }
  },
  {
    path: 'event',
    component: () => import('@/examples/event.vue'),
    meta: {
      title: 'event'
    }
  },
  // {
  //   path: 'temp',
  //   component: () => import('@/examples/temp.vue'),
  //   meta: {
  //     title: 'temp'
  //   }
  // }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    redirect: '/basic',
    children: menuRoutes
  },
  {
    path: '/editor',
    component: () => import('@/views/editor/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
