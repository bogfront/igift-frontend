<script>
export default {
  name: 'Auth'
}
</script>

<template>
  <section class="auth">
    <div class="auth__tabs">
      <router-link
        to="/auth/login"
        class="auth__tabs-tab"
        :class="{'auth__tabs-tab_selected': $route.path.includes('auth/login')}"
      >Вход</router-link>

      <router-link
        to="/auth/register"
        class="auth__tabs-tab"
        :class="{'auth__tabs-tab_selected': $route.path.includes('auth/register')}"
      >Регистрация</router-link>
    </div>

    <router-view></router-view>
  </section>
</template>

<style scoped lang="scss">
@import "../styles/settings";

.auth {
  max-width: 400px;
  margin: auto;

  &__tabs {
    margin-bottom: $indent-medium;
  }

  &__tabs-tab {
    text-decoration: none;
    padding: $indent-xsmall 0;

    &:not(:last-child) {
      margin-right: $indent-medium;
    }

    &_selected {
      color: $pink-color;
      border-bottom: 2px solid $pink-color;
    }
  }
}
</style>
