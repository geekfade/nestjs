<!-- @format -->

<script setup lang="ts">
import SidebarNav from '@/components/SidebarNav.vue';
import HeaderNav from '@/components/HeaderNav.vue';
import { userMenuStore } from '@/store/menus';
const store = userMenuStore();
</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 bg-secondary vh-100 text-white p-0">
        <SidebarNav :menuItems="store.menus" />
      </div>
      <div class="p-0" style="flex: 1">
        <div class="container-fluid">
          <HeaderNav />
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
