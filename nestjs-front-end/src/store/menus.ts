import { defineStore } from 'pinia';

export const userMenuStore = defineStore({
  id: 'userMenu',
  state: () => ({
    menus: [
      {
        id: 1,
        name: '首页',
        icon: 'fa-home',
        path: 'dashboard',
      },
      {
        id: 2,
        name: '用户管理',
        icon: 'fa-users',
        path: 'users',
      },
      {
        id: 3,
        name: '角色管理',
        icon: 'fa-user-tag',
        path: 'roles',
      },
      {
        id: 4,
        name: '菜单管理',
        icon: 'fa-bars',
        path: 'menus',
      },
    ] as MenuItem[],
  }),
  persist: true,
});
