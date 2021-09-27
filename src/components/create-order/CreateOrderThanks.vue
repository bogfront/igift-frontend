<script>
import * as api from '../../api';
import { STATUSES } from '../../utils/constants';

export default {
  name: "CreateOrderThanks",

  data: () => ({
    comment: ''
  }),

  computed: {
    selectedDesignId () {
      return this.$store.getters.orderForm.designId;
    },

    currentOrder () {
      return this.$store.getters.currentOrder;
    }
  },

  mounted () {
    this.$store.commit('setOrderStep', 1);
  },

  methods: {
    async submit () {
      try {
        await api.orders.changeStatus(this.currentOrder._id, STATUSES.CREATED);

      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <div class="create-order-thanks">
    <div class="text-center">
      <img src="../../assets/icons/check-rounded.svg">
    </div>

    <h2 class="create-order__head">Благодарим за оплату</h2>

    <p class="text-center"><b>Теперь мы ожидаем доставку</b></p>

    <p class="text-center">Как только мы получим товар, Вы увидите изменение статуса на главной странице личного кабинета.</p>

    <div class="text-center">
      <el-button
        class="create-order-thanks__submit"
        @click="$router.push({name: 'dashboard'})"
      >На главную</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/settings/index";

.create-order-thanks {
  width: 608px;
  margin: 120px auto;

  &__submit {
    max-width: 300px;
  }
}
</style>
