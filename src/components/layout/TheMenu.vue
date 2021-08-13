<script>
import {useCookies} from "@vueuse/integrations";

export default {
  name: "TheMenu",

  setup () {
    const cookies = useCookies(['locale']);
    return { cookies }
  },

  methods: {
    logout () {
      this.cookies.remove('access_token');
      window.location.href = '';
    }
  }
}
</script>

<template>
  <div
    class="menu"
    @click="$emit('close')"
  >
    <router-link
      :to="{name: 'dashboard'}"
      class="menu__item"
    >
      <img src="../../assets/icons/box.svg" alt="Все заказы">
      <span>Все заказы</span>
    </router-link>

    <router-link
      :to="{name: 'create-order-products'}"
      class="menu__item"
    >
      <img src="../../assets/icons/plus.svg" alt="Создать новый заказ">
      <span>Создать новый заказ</span>
    </router-link>

    <router-link
      to=""
      class="menu__item"
    >
      <img src="../../assets/icons/send.svg" alt="Заявка на выкуп">
      <span>Заявка на выкуп</span>
    </router-link>

    <router-link
      to=""
      class="menu__item menu__item_mta"
    >
      <img src="../../assets/icons/clock.svg" alt="История уведомлений">
      <span>История уведомлений</span>
    </router-link>

    <router-link
      to=""
      class="menu__item"
    >
      <img src="../../assets/icons/info-menu.svg" alt="Как это работает?">
      <span>Как это работает?</span>
    </router-link>

    <router-link
      to=""
      class="menu__item"
    >
      <img src="../../assets/icons/message-circle.svg" alt="Служба поддержки">
      <span>Служба поддержки</span>
    </router-link>

    <router-link
      to=""
      class="menu__item"
    >
      <img src="../../assets/icons/settings.svg" alt="Настройки">
      <span>Настройки</span>
    </router-link>

    <router-link
      :to="{name: 'login'}"
      class="menu__item"
      @click.prevent="logout"
    >
      <img src="../../assets/icons/log-out.svg" alt="Выход">
      <span>Выход</span>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/settings/index";

.menu {
  display: flex;
  flex-direction: column;
  height: calc(100% - 58px);
  margin: 58px $indent-small 0;

  &__item {
    display: flex;
    height: 50px;
    align-items: center;

    img {
      height: 16px;
      width: 16px;
      flex: none;
      padding: $indent-small;
      margin-right: $indent-small;
    }

    span {
      color: $dark-color;
    }

    &_mta {
      margin-top: auto;
    }
  }
}

</style>
