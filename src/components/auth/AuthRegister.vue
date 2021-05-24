<script>
import { auth } from "../../api";

export default {
  name: "AuthRegister",

  data: () => ({
    registerForm: {
      name: '',
      secondName: '',
      email: '',
      phone: '',
      password: ''
    }
  }),

  methods: {
    async submit () {
      await auth.register(this.registerForm)
    }
  }
}
</script>

<template>
  <el-form class="auth-login" ref="form" :model="registerForm">
    <el-form-item label="Имя">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>

    <el-form-item label="Фамилия">
      <el-input v-model="registerForm.secondName"></el-input>
    </el-form-item>

    <el-form-item label="Email" required>
      <el-input v-model="registerForm.email"></el-input>
    </el-form-item>

    <el-form-item label="Телефон">
      <el-input v-model="registerForm.phone"></el-input>
    </el-form-item>

    <el-form-item label="Пароль" required>
      <el-input type="password" v-model="registerForm.password"></el-input>
    </el-form-item>

    <div>Пожалуйста, указывайте Ваши настоящие данные. По ним мы будем идентифицировать Ваши посылки.</div>

    <el-form-item>
      <el-button type="primary" @click="submit">Зарегистрироваться</el-button>
    </el-form-item>

    <div>Регистрируясь, Вы подтверждаете, что ознакомились с нашим пользовательским соглашением</div>
  </el-form>
</template>

<style scoped lang="scss">

</style>
