import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/schedule',
    name: 'schedule',
    meta: {
      login: true
    },
    component: () => import('../views/Schedule.vue')
  },
  {
    path: '/timer',
    name: 'timer',
    meta: {
      login: true
    },
    component: () => import('../views/Timer.vue')
  },
  {
    path: '/daysMatter',
    name: 'daysMatter',
    meta: {
      login: true
    },
    component: () => import('../views/DaysMatter.vue')
  },
  {
    path: '/todayInHistory',
    name: 'todayInHistory',
    meta: {
      login: true
    },
    component: () => import('../views/TodayInHistory.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/passport',
    name: 'passport',
    component: () => import('../views/Passport.vue')
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '*',
    redirect: '/notFound'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
