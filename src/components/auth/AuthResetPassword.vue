<script>
import { auth } from "../../api";

export default {
  name: "AuthResetPassword",

  data () {
    return {
      resetForm: {
        newPassword: '',
      },

      rules: {
        password: [
          { newPassword: true, message: 'Введите пароль', trigger: 'blur' },
          { min: 8, trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    token () {
      return this.$route.params.token ?? null
    }
  },

  methods: {
    async resetPassword () {
      let validation = true;
      await this.$refs['resetForm'].validate((valid) => {
        validation = valid;
      });

      if (!validation || !this.token) {
        return;
      }

      try {
        await auth.resetPassword({
          ...this.resetForm,
          newPasswordToken: this.token
        })

        await this.$router.push({ name: 'login' });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <el-form
    class="auth-register"
    ref="resetForm"
    :rules="rules"
    :model="resetForm"
  >
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="resetForm.newPassword"
        placeholder="Новый пароль"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        class="auth-register__btn"
        @click="resetPassword"
      >Установить пароль</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
@import "../../styles/settings/index";

.auth-register{

  &__text {
    margin-bottom: $indent-large;
    line-height: 135%;

    &_info {
      color: $gray-color;
    }
  }

  &__btn {
    display: block;
    width: 250px !important;
    margin: auto;
  }
}
</style>
