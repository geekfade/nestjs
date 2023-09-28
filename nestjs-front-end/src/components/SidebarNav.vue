<!-- @format -->

<script setup lang="ts">
defineProps<{
  menuItems: MenuItem[];
}>();
</script>
<template>
  <ul class="nav flex-column">
    <li
      class="nav-item d-flex align-items-center px-4"
      v-for="item in menuItems"
      :key="item.id">
      <i :class="['fas fs-5 nav-icon', item.icon]"></i>
      <router-link
        :to="item.routeName ? { name: item.routeName } : item.path"
        class="nav-link active text-decoration-none text-white"
        aria-current="page"
        >{{ item.name }}</router-link
      >
    </li>
  </ul>
</template>
<style scoped>
.nav-item:hover {
  background-color: #343a40;
}
.nav-icon {
  width: 30px;
}
</style>
