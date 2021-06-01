<template>
  <div>
    <TheHeader />
    <router-view />
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";

export default {
  components: {
    TheHeader
  }
}
</script>

<style lang="scss">
@import "./styles/element/index";

#app {
  padding-top: 64px;
}
</style>
