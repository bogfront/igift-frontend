<script>
import { auth } from "../../api";
import {ElNotification} from "element-plus";
import {useCookies} from "@vueuse/integrations";
import { validateName } from "../../utils";

export default {
  name: "AuthRegister",

  setup () {
    const cookies = useCookies(['locale']);
    return { cookies }
  },

  data () {
    const checkName = (rule, value, callback) => {
      if (value.length === 0) {
        callback()
      }

      if (!validateName(value)) {
        callback(new Error());
      }

      callback();
    };

    const checkEmail = async (rule, value, callback) => {
      if (value.length === 0) {
        callback()
      }

      const isFree = await this.checkEmail();

      if (!isFree) {
        callback(new Error());
      }

      callback();
    };

    const checkPassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('Минимальная длина пароля: 8 символов'));
      }

      callback();
    }

    return {
      registerForm: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: ''
      },

      rules: {
        name: [
          { min: 2, message: 'Минимальная длина имени 2', trigger: 'blur' },
          { validator: checkName, message: 'Неверно указано имя', trigger: 'blur' }
        ],

        surname: [
          { min: 2, message: 'Минимальная длина фамилии 2', trigger: 'blur' },
          { validator: checkName, message: 'Неверно указана фамилия', trigger: 'blur' }
        ],

        email: [
          { required: true, message: 'Это поле должно быть заполнено', trigger: 'blur' },
          { type: 'email', message: 'Неправильно введен email', trigger: ['blur'] },
          { validator: checkEmail, message: 'Данный email уже зарегистрирован', trigger: 'blur' }
        ],

        password: [
          { required: true, message: 'Введите пароль', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    async submit () {
      let validation = true;
      await this.$refs['regForm'].validate((valid) => {
        validation = valid;
      });

      if (!validation) {
        return;
      }

      try {
        await auth.register(this.registerForm)

        await this.$router.push({ name: 'login' });
      } catch (error) {
        ElNotification({
          title: 'Ошибка регистрации',
          message: error?.response?.data?.message || 'Не удалось зарегистрировать пользователя',
          duration: 3000,
          position: 'bottom-right'
        })
      }
    },

    async checkEmail () {
      try {
        const { data } = await auth.checkEmail(this.registerForm.email);

        return data.data.is_free;
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
    ref="regForm"
    :rules="rules"
    :model="registerForm"
  >
    <el-form-item prop="name">
      <el-input
        v-model="registerForm.name"
        placeholder="Имя"
      />
    </el-form-item>

    <el-form-item prop="surname">
      <el-input
        v-model="registerForm.surname"
        placeholder="Фамилия"
      />
    </el-form-item>

    <el-form-item prop="email">
      <el-input
        v-model="registerForm.email"
        placeholder="Email"
      />
    </el-form-item>

    <el-form-item prop="phone">
      <el-input
        type="tel"
        v-model="registerForm.phone"
        placeholder="Телефон"
      />
    </el-form-item>

    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="registerForm.password"
        placeholder="Пароль"
      />
    </el-form-item>

    <div class="auth-register__text auth-register__text_info">* обязательные поля</div>

    <div class="text-center auth-register__text">Пожалуйста, указывайте Ваши настоящие данные. По ним мы будем идентифицировать Ваши посылки.</div>

    <el-form-item>
      <el-button
        class="auth-register__btn"
        @click="submit"
      >Зарегистрироваться</el-button>
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
