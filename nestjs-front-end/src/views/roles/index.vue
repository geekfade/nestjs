<script setup lang="ts">
import { getAllRoles } from '@/api/roles';
import { onBeforeMount, ref } from 'vue';

interface RoleItem {
  id: number;
  name: string;
}

const rolesList = ref([] as RoleItem[]);
const openModal = (type: string) => {
  console.log(type);
};

const getRoles = async () => {
  const res = (await getAllRoles()) as unknown as RoleItem[];
  if (res && res.length > 0) {
    rolesList.value = res;
  }
};

onBeforeMount(() => {
  getRoles();
});
</script>
<template>
  <div>
    <div class="mb-3">
      <button
        type="button"
        class="btn btn-primary px-3"
        @click="openModal('add')">
        <i class="fas fa-plus" />新增
      </button>
    </div>
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">名称</th>
          <th scope="col">分配权限</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in rolesList" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <th scope="row">{{ index }}</th>
          <th scope="row">{{ item.name }}</th>
          <td>
            <button
              type="button"
              class="btn btn-secondary px-4"
              @click="openModal('edit')">
              <i class="far fa-edit me-2" />编辑
            </button>
            <button
              type="button"
              class="btn btn-danger px-4 ms-3"
              @click="openModal('delete')">
              <i class="far fa-trash-alt me-2" />删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div>
</template>
<style lang="scss" scoped></style>
