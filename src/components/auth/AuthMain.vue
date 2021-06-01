<script>
export default {
  name: "AuthMain"
}
</script>

<template>
  <h2 class="title_small text-center">Необходимо авторизоваться</h2>
  <p class="text-center">Для того, чтобы создать новый заказ, пожалуйста, зарегистрируйтесь или войдите.</p>

  <div class="auth-main__actions">
    <el-button @click="$router.push({ name: 'register' })">Зарегистрироваться</el-button>
    <el-button
      type="primary"
      @click="$router.push({ name: 'login' })"
    >Войти</el-button>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/settings/index";

.auth-main {
  margin-top: $indent-large;

  &__actions {
    margin-top: $indent-large;

    .el-button {
      max-width: 250px;
      display: block;
      margin: auto;

      &:not(:last-child) {
        margin-bottom: $indent-medium;
      }
    }
  }
}
</style>
