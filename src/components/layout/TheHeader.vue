<script>
import TheMenu from "./TheMenu.vue";

export default {
  name: 'TheHeader',

  components: {
    TheMenu
  },

  data: () => ({
    drawer: false
  }),

  computed: {
    isAuth () {
      return this.$store.getters.isAuth;
    }
  }
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

    <el-button
      v-if="isAuth"
      plain
      class="header__menu-btn"
      @click="drawer = true"
    >
      <img src="../../assets/icons/user.svg" alt="menu">
    </el-button>
  </header>

  <el-drawer
    v-model="drawer"
    :with-header="false"
    size="80%"
  >
    <el-button
      plain
      class="header__menu-btn header__menu-btn_close"
      @click="drawer = false"
    >
      <img src="../../assets/icons/close-drawer.svg" alt="close">
    </el-button>

    <div class="header__drawer-content">
      <TheMenu
        @close="drawer = false"
      />
    </div>
  </el-drawer>
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
  width: calc(100% - 16px);
  background: #fff;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.06));
  margin-bottom: 40px;

  &__back {
    width: 32px !important;
    height: 32px !important;
    border-radius: $radius-medium;
    background: $gray-light !important;
  }

  &__menu-btn {
    margin-left: auto;
    width: 32px !important;
    height: 32px !important;
    border-radius: $radius-medium;

    &_close {
      position: absolute;
      right: 12px;
      top: 12px;
    }
  }

  &__drawer-content {
    height: 100%;
  }
}
</style>
