<script>
export default {
  name: 'TheHeader'
}
</script>

<template>
  <header class="header"></header>
</template>

<style scoped lang="scss">
@import "../../styles/settings/index";

.header {
  height: 48px;
  width: 100%;
  background: #fff;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.06));
  margin-bottom: 40px;

  @media (min-width: $media-xs) {
    height: 102px;
  }
}
</style>
