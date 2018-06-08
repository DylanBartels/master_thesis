import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/identity/index')
    }]
  },

  {
    path: '/identity',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Identity',
        component: () => import('@/views/identity/index'),
        meta: { title: 'Identity', icon: 'identity' }
      }
    ]
  },

  {
    path: '/marketplace',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Marketplace',
        component: () => import('@/views/marketplace/index'),
        meta: { title: 'Marketplace', icon: 'marketplace' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/exchange',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Exchange',
        component: () => import('@/views/exchange/index'),
        meta: { title: 'Exchange', icon: 'exchange' }
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})
