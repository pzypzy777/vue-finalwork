import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes:Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    component: ()=> import('../components/tabBar/TabBar.vue'),
    children: [
      {
        path: "home",
        name: "Home",
        component: ()=> import('../components/home/Home.vue')
      },
      {
        path: "video",
        name: "Video",
        component: ()=> import('../components/video/Video.vue')
      },
      {
        path: "show",
        name: "Show",
        component: ()=> import('../components/show/Show.vue')
      },
      {
        path: "mine",
        name: "Mine",
        component: ()=> import('../components/mine/Mine.vue')
      },
    ]
  },
  {
    path: "/search",
    name: "Search",
    component: ()=> import('../components/home/home-children/Search.vue')
  }
  
]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export default router