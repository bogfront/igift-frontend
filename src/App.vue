<script>
import TheHeader from "./components/layout/TheHeader.vue";

import {YANDEX_MAP_SRC} from "./utils/constants";

export default {
  components: {
    TheHeader
  },

  beforeMount() {
    let externalScript = document.createElement('script');
    externalScript.setAttribute('src', YANDEX_MAP_SRC);
    document.head.appendChild(externalScript);
  }
}
</script>

<template>
  <div>
    <TheHeader />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/element/index";

#app {
  padding-top: 64px;
}
</style>
