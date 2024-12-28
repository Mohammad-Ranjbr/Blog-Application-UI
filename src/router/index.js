import Vue from 'vue';
import VueRouter from 'vue-router';
import { isLoggedIn } from './../auth/index'; // Ensure this import is correct

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./../views/Login.vue'),
    meta: {
      hideNavbar: true,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('./../views/Signup.vue'),
    meta: {
      hideNavbar: true,
    },
  },
  {
    path: '/forget',
    name: 'ForgetPassword',
    component: () => import('./../views/ForgetPassword.vue'),
    meta: {
      hideNavbar: true,
    },
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('./../views/Profile.vue'),
  },
  {
    path: '/inbox',
    name: 'Chat',
    component: () => import('./../views/Chat.vue'),
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('./../views/Explore.vue'),
  },
  {
    path: '/saved',
    name: 'Saved',
    component: () => import('./../views/Saved.vue'),
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: () => import('./../views/CreatePost.vue'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('./../views/Setting.vue'),
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('./../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Middleware برای چک کردن احراز هویت
router.beforeEach((to, from, next) => {
  if (to.name === 'Login' && isLoggedIn()) {
    next({ path: '/' });
  } else if (to.name === 'Signup' && isLoggedIn()) {
    next({ path: '/' });
  } else if (!['Login', 'Signup', 'ForgetPassword'].includes(to.name) && !isLoggedIn()) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
