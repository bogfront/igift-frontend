<script>
import DashboardOrders from "../components/dashboard/DashboardOrders.vue";
import DashboardAddresses from "../components/dashboard/DashboardAddresses.vue";

import * as api from '../api'

export default {
  name: "Dashboard",

  components: {
    DashboardOrders,
    DashboardAddresses
  },

  data: () => ({
    orders: []
  }),

  mounted () {
    this.getOrders()
  },

  methods: {
    async getOrders () {
      const { data } = await api.orders.getOrders()

      this.orders = data;
    }
  }
}
</script>

<template>
  <div class="dashboard container">
    <div class="dashboard__center">
      <el-button
        class="dashboard__new-btn"
        @click="$router.push({ name: 'create-order-products' })"
      >+ Создать новый заказ</el-button>
    </div>

    <DashboardAddresses />

    <DashboardOrders :orders="orders" />
  </div>
</template>

<style scoped lang="scss">
@import "../styles/settings";

.dashboard {

  &__center {
    display: flex;
    justify-content: center;
  }

  &__new-btn {
    max-width: 300px;
    margin-bottom: $indent-large;
  }
}
</style>
