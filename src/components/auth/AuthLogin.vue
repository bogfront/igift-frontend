<script>
import { auth } from "../../api";
import { useCookies } from '@vueuse/integrations'

export default {
  name: "AuthLogin",

  setup () {
    const cookies = useCookies(['locale']);
    return { cookies }
  },

  data: () => ({
    loginForm: {
      email: '',
      password: ''
    }
  }),

  methods: {
    async submit () {
      try {
        const { data } = await auth.login(this.loginForm)

        this.cookies.set('access_token', data.access_token);
        await this.$router.push({ name: 'dashboard' });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <el-form class="auth-login" ref="form" :model="loginForm">
    <el-form-item label="Email">
      <el-input v-model="loginForm.email"></el-input>
    </el-form-item>

    <el-form-item label="Пароль">
      <el-input
        v-model="loginForm.password"
        type="password"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">Войти</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
