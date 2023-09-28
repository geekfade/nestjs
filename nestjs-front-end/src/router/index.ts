/** @format */

import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { App } from 'vue';
import Login from '@/views/login/index.vue';
import Register from '@/views/register/index.vue';
import Home from '@/layouts/default.vue';
import Dashboard from '@/views/dashboard/index.vue';
import Users from '@/views/users/index.vue';
import Roles from '@/views/roles/index.vue';
import Menus from '@/views/menus/index.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/dashboard',
    children: [
      {
        name: 'home',
        path: 'dashboard',
        component: Dashboard,
      },
      {
        name: 'users',
        path: 'users',
        component: Users,
      },
      {
        name: 'roles',
        path: 'roles',
        component: Roles,
      },
      {
        name: 'menus',
        path: 'menus',
        component: Menus,
      },
    ],
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
