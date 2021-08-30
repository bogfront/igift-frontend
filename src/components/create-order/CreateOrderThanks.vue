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
    <h2 class="create-order__head">Благодарим за оплату</h2>

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
  margin: auto;

  &__submit {
    max-width: 300px;
  }
}
</style>
