<script>
import DashboardOrders from "../components/dashboard/DashboardOrders.vue";

export default {
  name: "Dashboard",

  components: {
    DashboardOrders
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

    <DashboardOrders />
  </div>
</template>

<style scoped lang="scss">


.dashboard {

  &__center {
    display: flex;
    justify-content: center;
  }

  &__new-btn {
    max-width: 300px;
  }
}
</style>
