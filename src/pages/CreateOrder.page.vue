<script>
export default {
  name: "CreateOrder"
}
</script>

<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "../styles/settings/variables";

.create-order {

  &__content {
    max-width: 400px;
    margin: auto;
  }

  &__item {
    margin-bottom: $indent-medium;
  }

  &__head {
    text-align: center;
    margin-bottom: $indent-large;
  }

  &__select {
    width: 100%;
  }
}
</style>
