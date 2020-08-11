import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(
  VueRouter,
);

const routes = [
  {
    path: '*',
    component: (
    ) => import(
      '@/views/Front/FrontHome.vue'
    ),
  },
  {
    path: '/',
    component: (
    ) => import(
      '@/views/Front/FrontLayout.vue'
    ),
    children: [
      {
        path: '',
        name: 'Home',
        component: (
        ) => import(
          '@/views/Front/FrontHome.vue'
        ),
      },
      {
        path: 'category',
        name: 'Category',
        component: (
        ) => import(
          '@/views/Front/FrontCategory.vue'
        ),
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: (
        ) => import(
          '@/views/Front/FrontCheckout.vue'
        ),
      },
    ],
  },
  {
    path: '/detail',
    component: (
    ) => import(
      '@/views/Front/FrontLayout.vue'
    ),
    children: [
      {
        path: ':detailId',
        name: 'Detail',
        component: (
        ) => import(
          '@/views/Front/FrontDetail.vue'
        ),
      },
    ],
  },
  {
    path: '/cartorder',
    component: (
    ) => import(
      '@/views/Front/FrontLayout.vue'
    ),
    children: [
      {
        path: ':orderId',
        name: 'CartOrder',
        component: (
        ) => import(
          '@/views/Front/FrontCartOrder.vue'
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: (
    ) => import(
      '@/views/Back/BackLayout.vue'
    ),
    redirect: '/dashboard/product',
    children: [
      {
        path: 'product',
        name: 'Product',
        component: (
        ) => import(
          '@/views/Back/BackProducts.vue'
        ),
        meta: { requiresAuth: true },
      },
      {
        path: 'order',
        name: 'Order',
        component: (
        ) => import(
          '@/views/Back/BackOrder.vue'
        ),
        meta: { requiresAuth: true },
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: (
        ) => import(
          '@/views/Back/BackCoupon.vue'
        ),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = new VueRouter(
  {
    routes,
    linkExactActiveClass: 'active',
    scrollBehavior(
    ) {
      return { x: 0, y: 0 };
    },
  },
);

export default router;
