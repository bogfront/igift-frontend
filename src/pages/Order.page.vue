<script>
import * as api from "../api";
import { formatDate } from "../utils/date";

export default {
  name: "Order",

  data: () => ({
    order: null
  }),

  computed: {
    products () {
      if (!this.order?.products) {
        return ''
      }

      return this.order.products.map(item => item?.name).join(', ');
    }
  },

  mounted() {
    this.loadOrder();
  },

  created() {
    console.log(document.referrer);
  },

  methods: {
    async loadOrder () {
      if (!this.$route.params.id) {
        return;
      }

      const { data } = await api.orders.getOrder(this.$route.params.id);
      this.order = data;
    },

    format (date) {
      return formatDate(new Date(date));
    }
  }
}
</script>

<template>
  <div
    v-if="order"
    class="order"
  >
    <h2 class="order__head">Заказ # {{ order.number }}</h2>

    <div class="order__date">{{ format(order.createdAt) }}</div>

    <div class="order__gift">
      <div class="order__gift-design"></div>

      <div class="order__gift-info">
        <div>
          <b>{{ order.recipient.name }}</b>, {{ order.recipient.address }}, {{ order.recipient.city }}
        </div>
        <div>{{ order.recipient.deliveryTime }}</div>

        <strong>Внутри:</strong>
        <div>{{ products }}</div>
      </div>
    </div>
  </div>

  <div class="order__info">
    <img src="../assets/icons/info.svg" alt="attention">
    <div class="text-center">
      В настоящий момент  мы ожидаем Ваш заказ на складе.
      Пока мы его не получили, вы можете отредактировать ваш заказ или создать новый заказ для этого получателя.</div>
  </div>
</template>

<style scoped lang="scss">
@import "../styles/settings/index";

.order {
  width: 608px;
  margin: auto;

  &__head {
    text-align: center;
  }

  &__date {
    margin-bottom: $indent-medium;
    font-size: $font-size-body;
    font-weight: $font-weight-semi;
    color: $gray-color;
    text-align: center;
  }

  &__gift {
    width: 296px;
    margin: 0 auto $indent-large;
  }

  &__gift-design {
    width: 88px;
    height: 88px;
    margin: 0 0 $indent-medium;
    border-radius: $radius-medium;
    background: rgba($pink-color, .85);
  }

  &__gift-info {
    margin-bottom: $indent-medium;
    color: $gray-color;
    font-size: 14px;

    div {
      margin-bottom: $indent-xsmall;
    }

    strong {
      display: block;
      color: $dark-color;
      font-size: 16px;
      margin-top: $indent-medium;
      margin-bottom: $indent-xsmall;
    }
  }

  &__info {
    max-width: 300px;
    margin: auto;
    text-align: center;
  }
}
</style>
