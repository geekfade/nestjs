<!-- @format -->

<script setup lang="ts">
defineProps<{
  menuItems: MenuItem[];
}>();
</script>
<template>
  <ul class="nav flex-column">
    <li
      class="nav-item d-flex align-items-center"
      v-for="item in menuItems"
      :key="item.id">
      <i :class="['fas fs-5', item.icon]"></i>
      <router-link
        :to="item.routeName ? { name: item.routeName } : item.path"
        class="nav-link active"
        aria-current="page"
        >{{ item.name }}</router-link
      >
    </li>
    <!-- <li class="nav-item">
      <router-link :to="{ name: 'users' }" class="nav-link"
        >用户管理</router-link
      >
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'roles' }" class="nav-link"
        >角色管理</router-link
      >
    </li>
    <li class="nav-item">
      <router-link :to="{ name: 'menus' }" class="nav-link"
        >菜单管理</router-link
      >
    </li> -->
  </ul>
</template>
<style lang="scss" scoped></style>
