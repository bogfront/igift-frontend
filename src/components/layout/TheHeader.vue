<script>
export default {
  name: 'TheHeader'
}
</script>

<template>
  <header class="header">
    <el-button
      plain
      class="header__back"
      @click="$router.go(-1)"
    >
      <img src="../../assets/icons/chevron-left.svg" alt="back">
    </el-button>
  </header>
</template>

<style scoped lang="scss">
@import "../../styles/settings/index";

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 $indent-small;
  height: 48px;
  width: 100%;
  background: #fff;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.06));
  margin-bottom: 40px;

  &__back {
    width: 32px !important;
    height: 32px !important;
    border-radius: $radius-medium;
    background: $gray-light !important;
  }
}
</style>
