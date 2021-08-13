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
    isShowPassword: false,

    loginForm: {
      email: '',
      password: ''
    }
  }),

  methods: {
    async submit () {
      if (this.step === 0) {
        const { data } = await auth.checkEmail(this.loginForm.email);
        const isFree = data.data.is_free;

        if (!isFree) {
          this.step++;
        } else {
          ElNotification({
            message: 'Указанный email не зарегистрирован',
            duration: 3000,
            position: 'bottom-right'
          })
        }

        return;
      }

      try {
        const { data } = await auth.login(this.loginForm)

        this.cookies.set('access_token', data.data.token.access_token, {
          maxAge: data.data.token.expires_in
        });

        this.$store.commit('setUser', data.data.user);

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
    },

    async forgot () {
      try {
        const { data } = await auth.checkEmail(this.loginForm.email);
        const isFree = data.data.is_free;

        if (isFree) {
          ElNotification({
            message: 'Указанного email нет в базе',
            duration: 3000,
            position: 'bottom-right'
          })

          return;
        }

        await auth.forgot(this.loginForm.email)
        await this.$router.push({ name: 'forgot' })
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <el-form
    class="auth-login"
    ref="form"
    :model="loginForm"
    @submit.prevent
  >
    <el-form-item v-if="step === 0">
      <el-input
        type="email"
        name="email"
        v-model="loginForm.email"
        placeholder="Ваш E-mail или номер телефона"
      ></el-input>
    </el-form-item>

    <el-form-item v-if="step === 1">
      <el-input
        v-model="loginForm.password"
        :type="isShowPassword ? 'text' : 'password'"
        class="auth-login__show-btn"
      >
        <template #append>
          <el-button
            class="auth-login__eye"
            @click="isShowPassword = !isShowPassword"
          ></el-button>
        </template>
      </el-input>
    </el-form-item>

    <div class="auth-login__forgot">
      <el-button
        type="text"
        class="auth-login__forgot-btn"
        @click="forgot"
      >Забыли пароль?</el-button>
    </div>

    <el-form-item>
      <el-button
        class="auth-login__btn"
        @click="submit"
      >Войти</el-button>
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
    font-weight: 500;
    display: inline-block;
    padding: 0;
    width: auto !important;
    text-transform: none !important;
  }

  &__btn {
    display: block;
    width: 250px !important;
    margin: auto;
  }

  &__eye {
    background: #ffffff !important;
    width: 100%;
    height: 100%;

    &:before {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      top: 50%;
      left: 50%;
      background: url('../../assets/icons/eye.svg');
      background-size: contain;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
