<script>
import * as api from "../api";
import { formatDate } from "../utils/date";
import packing from '../storage/packing';

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
    },

    wrapCover () {
      return packing.find(item => '' + item.id === this.order.products[0]?.wrap)?.cover;
    }
  },

  mounted() {
    this.loadOrder();
  },

  methods: {
    async loadOrder () {
      if (!this.$route.params.id) {
        return;
      }

      const { data } = await api.orders.getOrder(this.$route.params.id);
      this.order = data.data;
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
      <div class="order__gift-design">
        <img
          :src="wrapCover ?? '/src/assets/giftboxes/1/gift_boxes02877-1.jpg'"
        />
      </div>

      <div class="order__gift-info">
        <div>
          <b>{{ order.receiver.name }}</b>, {{ order.receiver.address }}, {{ order.receiver.city }}
        </div>
        <div>{{ order.receiver?.deliveryTime }}</div>

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
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
