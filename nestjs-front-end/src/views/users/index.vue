<script setup lang="ts">
import { getAllRoles } from '@/api/roles';
import { getAllUsers } from '@/api/user';
import { onBeforeMount, ref } from 'vue';
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

const usersList = ref([] as UserItem[]);
const rolesList = ref([] as RoleItem[]);
const userInfo = ref({} as any);

const getUsers = async () => {
  const res = (await getAllUsers({
    page: 1,
    limit: 10,
  })) as unknown as UserItem[];
  if (res.length > 0) {
    usersList.value = res;
  }
};

const getRoles = async () => {
  const res = (await getAllRoles()) as unknown as RoleItem[];
  if (res && res.length > 0) {
    rolesList.value = res;
  }
};

onBeforeMount(() => {
  getRoles();
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
            <button
              type="button"
              class="btn btn-secondary px-4"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              @click="
                () => {
                  Object.assign(userInfo, {
                    username: item.username,
                    roles: item.roles.map((o) => o.id),
                    gender: item.profile?.gender,
                    address: item.profile?.address,
                  });
                }
              ">
              <i class="far fa-edit me-2" />编辑
            </button>
            <button
              type="button"
              class="btn btn-danger px-4 ms-3"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal">
              <i class="far fa-trash-alt me-2" />删除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item">
          <a class="page-link" href="#">1</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>

    <!--edit Modal -->
    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">修改</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="username" class="form-label">用户名</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  aria-describedby="emailHelp"
                  placeholder="请输入用户名"
                  v-model="userInfo.username" />
              </div>

              <div class="mb-3">
                <label for="username" class="form-label">角色</label>
                <div>
                  <div
                    v-for="item in rolesList"
                    :key="item.id"
                    class="form-check form-check-inline">
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :id="'roles' + item.id"
                      :value="item.id"
                      v-model="userInfo.roles" />
                    <label class="form-check-label" :for="'roles' + item.id">{{
                      item.name
                    }}</label>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="username" class="form-label">性别</label>
                <div>
                  <div
                    class="form-check form-check-inline"
                    v-for="item in [
                      { id: 0, name: '男' },
                      { id: 1, name: '女' },
                    ]"
                    :key="item.id">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      :value="item.id"
                      v-model="userInfo.gender" />
                    <label class="form-check-label" for="inlineRadio1">{{
                      item.name
                    }}</label>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="username" class="form-label">用户头像</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  aria-describedby="emailHelp"
                  placeholder="请输入头像地址"
                  v-model="userInfo.photo" />
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">地址</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  aria-describedby="emailHelp"
                  placeholder="请输入地址"
                  v-model="userInfo.address" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary">确定</button>
          </div>
        </div>
      </div>
    </div>
    <!--delete Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">删除</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">确定删除该记录吗？</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
