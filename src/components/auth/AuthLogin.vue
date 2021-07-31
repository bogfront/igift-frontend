<script>
import { ElNotification } from 'element-plus';
import { auth } from "../../api";
import { useCookies } from '@vueuse/integrations'

export default {
  name: "AuthLogin",

  setup () {
    const cookies = useCookies(['locale']);
    return { cookies }
  },

  data: () => ({
    step: 0,

    loginForm: {
      email: '',
      password: ''
    }
  }),

  methods: {
    async submit () {
      if (this.step === 0) {
        this.step++;
        return;
      }
      try {
        const { data } = await auth.login(this.loginForm)

        this.cookies.set('access_token', data.access_token);
        await this.$router.push({ name: 'dashboard' });
      } catch (error) {

        ElNotification({
          title: 'Не удалось авторизоваться',
          message: 'Неверно указана пара логин/пароль',
          duration: 3000,
          position: 'bottom-right'
        })

        console.error(error);
      }
    }
  }
}
</script>

<template>
  <el-form class="auth-login" ref="form" :model="loginForm">
    <el-form-item
      v-if="step === 0"
      label="Email"
    >
      <el-input v-model="loginForm.email"></el-input>
    </el-form-item>

    <el-form-item
      v-if="step === 1"
      label="Пароль"
    >
      <el-input
        v-model="loginForm.password"
        type="password"
      />
    </el-form-item>

    <div class="auth-login__forgot">
      <el-button
        type="text"
        class="auth-login__forgot-btn"
        @click="$router.push({ name: 'forgot' })"
      >Забыли пароль?</el-button>
    </div>

    <el-form-item>
      <el-button @click="submit">Войти</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
@import "../../styles/settings";

.auth-login {

  &__forgot {
    display: flex;
    justify-content: flex-end;
    margin-top: -8px;
    margin-bottom: $indent-medium;
  }

  &__forgot-btn {
    display: inline-block;
    padding: 0;
    width: auto !important;
    text-transform: none !important;
  }
}
</style>
