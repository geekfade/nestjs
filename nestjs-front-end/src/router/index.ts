/** @format */

import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import { App } from 'vue';
import Login from '@/views/login/index.vue';
import Register from '@/views/register/index.vue';

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
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
