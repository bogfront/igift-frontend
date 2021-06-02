<script>
export default {
  name: "DashboardAddresses",

  data: () => ({
    addresses: [
      {
        title: 'В Санкт-Петербурге:',
        address: '197082, ул. Оптиков, д. 47, 1 этаж, вывеска «igift»',
        receiver: 'Дмитрий Бабяк',
        phone: '+7 (921) 750-27-05'
      },
      {
        title: 'В Москве:',
        address: 'Скоро появится информация',
        developing: true
      }
    ]
  })
}
</script>

<template>
  <div class="dashboard-addresses__title">Ваш личный адрес для доставки предоплаченных товаров на наш склад. Оформляйте доставку на этот адрес:</div>

  <div class="dashboard-addresses__subtitle">Всегда указывайте Ваше имя и Ваш номер телефона</div>

  <div class="dashboard-addresses__container">
    <div
      v-for="(address, index) in addresses"
      :key="`address-${index}`"
      class="dashboard-addresses__item"
    >
      <div class="dashboard-addresses__item-title">
        {{ address.title }}
      </div>

      <div class="dashboard-addresses__flex">
        <div class="dashboard-addresses__item-text">
          {{ address.address }}
        </div>

        <el-button
          v-if="!address.developing"
          type="text"
          class="dashboard-addresses__item-btn"
        >Скопировать</el-button>
      </div>

      <div
        v-if="!address.developing"
        class="dashboard-addresses__flex">
        <div class="dashboard-addresses__item-text">
          {{ address.receiver }}
        </div>

        <el-button
          type="text"
          class="dashboard-addresses__item-btn"
        >Скопировать</el-button>
      </div>

      <div
        v-if="!address.developing"
        class="dashboard-addresses__flex"
      >
        <div class="dashboard-addresses__item-text">
          {{ address.phone }}
        </div>

        <el-button
          type="text"
          class="dashboard-addresses__item-btn"
        >Скопировать</el-button>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/settings/index";

.dashboard-addresses {

  &__title {
    text-align: center;
    font-weight: $font-weight-semi;
    margin-bottom: $indent-medium;
  }

  &__subtitle {
    color: $gray-color;
    text-align: center;
    margin-bottom: $indent-medium;
  }

  &__container {
    display: flex;
    overflow-x: scroll;
    margin-bottom: $indent-medium;
  }

  &__item {
    width: 100%;
    min-width: 270px;
    padding: $indent-small;
    border-radius: $radius-medium;
    border: 1px dashed $purple-color;

    &:not(:last-child) {
      margin-right: $indent-small;
    }
  }

  &__item-title {
    font-weight: $font-weight-semi;
    margin-bottom: $indent-small;
  }

  &__item-text {
    font-size: $font-size-small;
    max-width: 160px;
    width: 100%;
    margin-bottom: $indent-small;
  }

  &__flex {
    margin-bottom: $indent-small;
    display: flex;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item-btn {
    margin-left: auto;
    color: $gray-color;
    text-transform: none !important;
    font-size: $font-size-small !important;
    width: auto !important;
    height: 16px !important;
  }
}
</style>
