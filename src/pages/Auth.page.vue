<script>
export default {
  name: 'Auth',

  computed: {
    isLoginRegister () {
      const routeName = this.$route.name;
      return routeName === 'login' || routeName === 'register';
    },

    isForgot () {
      return this.$route.name === 'forgot'
    }
  }
}
</script>

<template>
  <section class="auth">
    <div
      v-if="isLoginRegister"
      class="auth__tabs"
    >
      <router-link
        to="/auth/login"
        class="auth__tabs-tab"
        :class="{'auth__tabs-tab_selected': $route.name === 'login'}"
      >Вход</router-link>

      <router-link
        to="/auth/register"
        class="auth__tabs-tab"
        :class="{'auth__tabs-tab_selected': $route.name === 'register'}"
      >Регистрация</router-link>
    </div>

    <router-view></router-view>

    <template v-if="!isForgot">
      <div class="auth__social">
        <div class="auth__social-divider">
          или войдите <br>через соц. сети
        </div>
      </div>

      <div v-if="false" class="auth__icons">
        <el-button plain>
          <img src="../assets/icons/vk.svg" alt="vk">
        </el-button>

        <el-button plain>
          <img src="../assets/icons/facebook.svg" alt="facebook">
        </el-button>

        <el-button plain>
          <img src="../assets/icons/google.svg" alt="google">
        </el-button>

        <el-button plain>
          <img src="../assets/icons/yandex.svg" alt="yandex">
        </el-button>
      </div>
    </template>

    <div
      v-if="$route.name === 'register'"
      class="text-center auth__info"
    >
      Регистрируясь, Вы подтверждаете, что ознакомились с нашим <a href="">пользовательским соглашением</a>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "../styles/settings";

.auth {
  max-width: 400px;
  margin: auto;
  padding: 0 $indent-medium;

  &__tabs {
    margin-bottom: $indent-large;
  }

  &__tabs-tab {
    text-decoration: none;
    padding: $indent-xsmall 0;
    color: $dark-color;
    font-size: $font-size-body;
    font-weight: $font-weight-semi;

    &:not(:last-child) {
      margin-right: $indent-medium;
    }

    &_selected {
      color: $pink-color;
      border-bottom: 2px solid $pink-color;
    }
  }

  &__social {
    border-top: 1px solid $gray-divider;
    margin: 42px 0 $indent-medium;
    display: flex;
    justify-content: center;
  }

  &__social-divider {
    text-align: center;
    transform: translateY(-50%);
    background: #ffffff;
    display: inline-flex;
    padding: 0 $indent-large;
  }

  &__icons {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;

    .el-button {
      width: 40px !important;
      padding: 0 !important;

      &:not(:last-child) {
        margin-right: $indent-small;
      }
    }
  }

  &__info {
    margin-bottom: $indent-large;
  }
}
</style>
