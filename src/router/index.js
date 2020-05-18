import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from "../components/pages/Layout"
import Login from "../components/pages/Login"
import Userindex from "../components/pages/User/Index"
import Userinfo from "../components/pages/User/Info"
import Memberindex from "../components/pages/Member/Index"
import Memberinfo from "../components/pages/Member/Info"
import Categoryindex from "../components/pages/Category/index"
import Categoryinfo from "../components/pages/Category/Info"
import Detailindex from "../components/pages/Detail/index"
import Detailinfo from "../components/pages/Detail/Info"
import Bannerindex from "../components/pages/Banner/index"
import Bannerinfo from "../components/pages/Banner/Info"
import Cartindex from "../components/pages/Cart/index"
import Cartinfo from "../components/pages/Cart/Info"

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      meta: { select: '/' },
      children: [
        { path: 'user', component: Userindex, meta: { select: '/user' } },
        { path: 'user/add', component: Userinfo, meta: { select: '/user' } },
        { path: 'user/:id', component: Userinfo, meta: { select: '/user' } },
        { path: 'member', component: Memberindex, meta: { select: '/member' } },
        { path: 'member/add', component: Memberinfo, meta: { select: '/member' } },
        { path: 'member/:id', component: Memberinfo, meta: { select: '/member' } },
        { path: 'category', component: Categoryindex, meta: { select: '/category' } },
        { path: 'category/add', component: Categoryinfo, meta: { select: '/category' } },
        { path: 'category/:id', component: Categoryinfo, meta: { select: '/category' } },
        { path: 'detail', component: Detailindex, meta: { select: '/detail' } },
        { path: 'detail/add', component: Detailinfo, meta: { select: '/detail' } },
        { path: 'detail/:id', component: Detailinfo, meta: { select: '/detail' } },
        { path: 'banner', component: Bannerindex, meta: { select: '/banner' } },
        { path: 'banner/add', component: Bannerinfo, meta: { select: '/banner' } },
        { path: 'banner/:id', component: Bannerinfo, meta: { select: '/banner' } },
        { path: 'cart', component: Cartindex, meta: { select: '/cart' } },
        { path: 'cart/add', component: Cartinfo, meta: { select: '/cart' } },
        { path: 'cart/:id', component: Cartinfo, meta: { select: '/cart' } },
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
