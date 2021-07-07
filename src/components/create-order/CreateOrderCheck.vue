<script>
export default {
  name: "CreateOrderCheck",

  data: () => ({
    comment: ''
  }),

  computed: {
    selectedDesignId () {
      return this.$store.getters.orderForm.designId;
    }
  },

  mounted () {
    this.$store.commit('setOrderStep', 1);
  },

  methods: {
    async submit () {
      await this.$store.dispatch('createOrder');
    }
  }
}
</script>

<template>
  <div class="create-order-check">
    <h2 class="create-order__head">Проверяем Ваш подарок</h2>

    <div class="create-order-check__gift">
      <div class="create-order-check__gift-design"></div>

      <div class="create-order-check__gift-info">
        <div>Для Аллы, г. Санкт-Петербург</div>
        <div>Как можно скорее</div>

        <strong>Внутри:</strong>
        <div>Ручка голубая</div>
      </div>

      <div class="create-order-check__gift-price">1 000 ₽</div>
    </div>

    <div class="text-center">
      <el-button
        class="create-order-check__submit"
        @click="submit"
      >Оплатить</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/settings/index";

.create-order-check {
  width: 608px;
  margin: auto;

  &__gift {
    border: 1px solid #EDEDED;
    border-radius: $radius-medium;
    width: 296px;
    margin: 0 auto $indent-large;
    padding: $indent-large $indent-medium;
  }

  &__gift-design {
    width: 88px;
    height: 88px;
    margin: 0 auto $indent-medium;
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

  &__gift-price {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    padding-top: $indent-medium;
    border-top: 1px solid #EDEDED;
  }

  &__submit {
    max-width: 300px;
  }
}
</style>
