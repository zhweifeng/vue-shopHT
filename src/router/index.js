import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ActivityList from '@/components/activity/activityList'
import EditActivity from '@/components/activity/editActivity'
import ADDActivity from '@/components/activity/addActivity'
import StoreList from '@/components/dingManage/storeList'


import goodsList from '@/components/goodsManage/goodsList'
import goodsEdit from '@/components/goodsManage/goodsEdit'
import goodsAdd from '@/components/goodsManage/goodsAdd'


import ShopManage from '@/components/dingManage/shopManage'
import AddStore from '@/components/dingManage/addStore'
import StoreDetail from '@/components/dingManage/storeDetail'
import UserList from '@/components/user/userList'


Vue.use(Router)

let router = new Router({
  routes: [
    {
      // 登录
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      name: 'index',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    // 活动列表
    {
      path: '/activityList',
      name: 'activityList',
      component: ActivityList,
      meta: {
        title: '活动列表'
      }
    },
    // 编辑活动
    {
      path: '/editActivity/:id',
      name: 'editActivity',
      component: EditActivity,
      meta: {
        title: '编辑活动'
      }
    },
    // 新增活动
    {
      path: '/addActivity/:id',
      name: 'addActivity',
      component: ADDActivity,
      meta: {
        title: '新增活动'
      }
    },
    // 商品列表
    {
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList
    },
    // 商品编辑
    // 商品列表
    {
      path: '/goodsEdit/:id',
      name: 'goodsEdit',
      component: goodsEdit
    },
    // 商品列表
    {
      path: '/goodsAdd',
      name: 'goodsAdd',
      component: goodsAdd
    },
    // 叮店列表
    {
      path: '/shopList',
      name: 'shopList',
      component: StoreList
    },
    // 新增叮店
    {
      path: '/addStore',
      name: 'addStore',
      component: AddStore
    } ,
    // 叮店详情
    {
      path: '/storeDetail/:id',
      name: 'storeDetail',
      component: StoreDetail
    },
    //叮店管理
    {
      path: '/shopManage',
      name: 'shopManage',
      component: ShopManage
    },
    //叮店管理
    {
      path: '/userList',
      name: 'userList',
      component: UserList
    }
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router