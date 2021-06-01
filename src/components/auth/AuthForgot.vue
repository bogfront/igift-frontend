<script>
export default {
  name: "AuthForgot"
}
</script>

<template>
  <img
    src="../../assets/forgot-password.png"
    alt="Восстановление пароля"
    class="auth-forgot__img"
  >

  <h2 class="title_small text-center">Мы отправили Вам ссылку для восстановления пароля! </h2>

  <p class="text-center">Пожалуйста, проверьте Вашу почту. Ссылка действительна 14 дней.</p>
</template>

<style scoped lang="scss">
@import "../../styles/settings";

.auth-forgot {

  &__img {
    display: block;
    margin: 96px auto $indent-medium;
  }
}
</style>
