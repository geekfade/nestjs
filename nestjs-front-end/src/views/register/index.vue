<!-- @format -->

<script setup lang="ts"></script>
<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100">
    <div class="col-4">
      <form class="shadow-sm rounded p-4 border">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">用户名</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">密码</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1" />
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
