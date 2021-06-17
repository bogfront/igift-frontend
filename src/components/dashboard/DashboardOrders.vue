<script>
import { STATUSES, STATUSES_RUS } from "../../utils/constants";
import { formatDate } from "../../utils/date";

export default {
  name: "DashboardOrders",

  data: () => ({
    STATUSES,
    STATUSES_RUS
  }),

  computed: {
    orders () {
      return this.$store.getters.orders;
    },

    status () {
      return this.$store.getters.status;
    }
  },

  methods: {
    setStatus (status) {
      this.$store.commit('setOrderStatusFilter', status);
      this.$store.dispatch('loadOrders');
    },

    getDate (date) {
      return formatDate(new Date(date));
    }
  }
}
</script>

<template>
  <div class="dashboard-orders__info">
    <img src="../../assets/icons/info.svg" alt="attention">
    <div class="text-center">Товары, запрещенные<br/> к доставке на наш склад</div>
  </div>

  <h2 class="dashboard-orders__title">Ваши заказы</h2>

  <div class="dashboard-orders__filter">
    <el-button
      :class="{
        'dashboard-orders__filter-btn': true,
        'dashboard-orders__filter-btn_active': status === ''
      }"
      @click="setStatus('')"
    >Все заказы</el-button>

    <el-button
      :class="{
        'dashboard-orders__filter-btn': true,
        'dashboard-orders__filter-btn_active': status === STATUSES.WORKING
      }"
      @click="setStatus(STATUSES.WORKING)"
    >В работе</el-button>

    <el-button
      :class="{
        'dashboard-orders__filter-btn': true,
        'dashboard-orders__filter-btn_active': status === STATUSES.FINISHED
      }"
      @click="setStatus(STATUSES.FINISHED)"
    >Завершенные</el-button>

    <el-button
      :class="{
        'dashboard-orders__filter-btn': true,
        'dashboard-orders__filter-btn_active': status === STATUSES.DRAFT
      }"
      @click="setStatus(STATUSES.DRAFT)"
    >Черновики</el-button>
  </div>

  <div
    v-for="(order, index) in orders"
    :key="`order-${index}`"
    class="dashboard-orders__order"
  >
    <div class="dashboard-orders__order-flex">
      <div class="dashboard-orders__order-small">№ {{ order.number }}</div>
      <div class="dashboard-orders__order-small">от {{ getDate(order.createdAt) }}</div>
    </div>

    <div class="dashboard-orders__order-flex">
      <div class="dashboard-orders__order-small">{{ STATUSES_RUS[order.status] }}</div>
      <div
        v-if="false"
        class="dashboard-orders__order-small"
      >15.03.2020</div>
    </div>

    <div
      v-if="order.delivery"
      class="dashboard-orders__order-title"
    >{{ order.delivery.name }}, {{ order.delivery.address }}, г. {{ order.delivery.city }}</div>

    <div class="dashboard-orders__order-actions">
      <el-button class="dashboard-orders__order-btn">Редактировать</el-button>

      <el-button class="dashboard-orders__order-btn">Отменить</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/settings/index";

.dashboard-orders {

  &__info {
    font-size: $font-size-body;
    text-align: center;
    margin-bottom: $indent-large;
  }

  &__title {
    font-size: 18px;
  }

  &__filter {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: $indent-small;
    margin-bottom: $indent-large;
  }

  &__filter-btn {
    border-radius: $radius-medium !important;
    background: #ffffff;
    border: 1px solid $gray-divider;
    color: $dark-color;
    text-transform: none;

    &_active {
      border: 1px solid $pink-color;
      color: $pink-color;
    }
  }

  &__order {
    border: 1px solid $gray-divider;
    border-radius: $radius-medium;
    padding: $indent-medium;
    margin-bottom: $indent-small;
  }

  &__order-flex {
    display: flex;
    justify-content: space-between;
    margin-bottom: $indent-small;

    &:nth-child(2) {
      color: $gray-color;
    }
  }

  &__order-small {
    font-size: $font-size-small;
  }

  &__order-title {
    font-size: $font-size-body;
    margin-bottom: $indent-medium;
  }

  &__order-actions {
    display: flex;
  }

  &__order-btn {
    border-radius: $radius-medium !important;
    background: #ffffff;
    border: 1px solid $pink-color;
    color: $pink-color;
    text-transform: none;

    &:nth-child(2) {
      color: $dark-color;
      border: 1px solid $dark-color;
      margin-left: $indent-medium;
    }
  }
}

</style>
