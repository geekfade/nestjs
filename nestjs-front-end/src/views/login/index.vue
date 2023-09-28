<!-- @format -->

<script setup lang="ts">
import { computed, reactive } from 'vue';
import axios from '@/utils/axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginInfo = reactive({
  username: '',
  usernameMsg: computed(() => {
    if (
      loginInfo.username !== '' &&
      !/^[\w-]{4,16}$/.test(loginInfo.username)
    ) {
      return '请输入用户名';
    }
    return '';
  }),
  password: '',
  passwordMsg: computed(() => {
    if (loginInfo.password !== '' && loginInfo.password.length < 6) {
      return '密码长度不能小于6位';
    }
    return '';
  }),
});

const login = () => {
  router.push('/home');
  // axios.post('/auth/login', loginInfo).then((res) => {
  //   console.log(res);
  // });
};
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
            type="text"
            :class="['form-control', { 'is-invalid': loginInfo.usernameMsg }]"
            id="exampleInputEmail1"
            aria-describedby="emailHelp" />
          <div class="invalid-feedback">{{ loginInfo.usernameMsg }}</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">密码</label>
          <input
            v-model="loginInfo.password"
            type="password"
            :class="['form-control', { 'is-invalid': loginInfo.passwordMsg }]"
            id="exampleInputPassword1" />
          <div class="invalid-feedback">{{ loginInfo.passwordMsg }}</div>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">记住密码</label>
        </div>
        <div class="d-flex flex-column align-items-center px-1">
          <button
            type="submit"
            class="btn btn-primary w-100 mb-2"
            @click.prevent="login">
            登录
          </button>
          <router-link
            to="/register"
            class="w-100 border rounded text-decoration-none text-center">
            <button type="submit" class="btn">注册</button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
