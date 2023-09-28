<!-- @format -->

<script setup lang="ts">
import { reactive } from 'vue';

const loginInfo = reactive({
  username: '',
  password: '',
});
</script>
<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100">
    <div class="col-11 col-sm-8 col-lg-6 col-xl-4">
      <form class="shadow-sm rounded p-4 border">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">用户名</label>
          <input
            v-model="loginInfo.username"
            type="email"
            class="form-control is-invalid"
            id="exampleInputEmail1"
            aria-describedby="emailHelp" />
          <div id="validationServerUsernameFeedback" class="invalid-feedback">
            请输入用户名
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">密码</label>
          <input
            v-model="loginInfo.password"
            type="password"
            class="form-control is-invalid"
            id="exampleInputPassword1" />
          <div id="validationServerUsernameFeedback" class="invalid-feedback">
            请输入密码
          </div>
        </div>
        <div class="d-flex flex-column align-items-center px-1">
          <button type="submit" class="btn btn-primary w-100 mb-2">注册</button>
          <router-link
            to="/login"
            class="w-100 border rounded text-decoration-none text-center">
            <button type="submit" class="btn">登录</button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
