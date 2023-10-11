<script setup lang="ts">
import axios from '@/utils/axios';
import { onBeforeMount, ref } from 'vue';
const usersList = ref([] as UserItem[]);
interface RoleItem {
  id: number;
  name: string;
}
interface Profile {
  gender: number;
  address: string;
  photo: string;
}
interface UserItem {
  id: number;
  username: string;
  profile: Profile;
  roles: RoleItem[];
}

const getUsers = async () => {
  const res = (await axios.get('/user/get')) as [UserItem];
  if (res && res.length > 0) {
    usersList.value = res;
  }
};

onBeforeMount(() => {
  getUsers();
});
</script>
<template>
  <div>
    <table class="table table-bordered table-hover table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">用户名</th>
          <th scope="col">角色</th>
          <th scope="col">性别</th>
          <th scope="col">头像</th>
          <th scope="col">地址</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usersList" :key="item.id">
          <th scope="row">{{ index }}</th>
          <th scope="row">{{ item.username }}</th>
          <td>{{ item.roles.map((o) => o.name).join(',') }}</td>
          <td>{{ item.profile?.gender }}</td>
          <td>{{ item.profile?.address }}</td>
          <td>{{ item.profile?.photo }}</td>
          <td>
            <button type="button" class="btn btn-secondary px-4">
              <i class="far fa-edit me-2" />编辑
            </button>
            <button type="button" class="btn btn-danger px-4 ms-3">
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
