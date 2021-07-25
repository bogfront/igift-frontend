<script>
export default {
  name: "CreateOrderRecipient",

  data: () => ({
    recipient: {
      name: '',
      phone: '',
      city: '',
      address: '',
      deliveryTime: 1,
      comment: ''
    },

    cities: [],
    loadingCity: false
  }),

  mounted () {
    this.$store.commit('setOrderStep', 1);
  },

  methods: {
    async suggestCity (query) {
      if (!ymaps) {
        return;
      }

      this.loadingCity = true;

      const result = await ymaps.suggest(query);
      this.cities = result.map(item => item.displayName);

      this.loadingCity = false;
    },

    submitRecipient () {
      this.$store.commit('setRecipient', this.recipient);

      this.$router.push({ name: 'create-order-check' });
    }
  }
}
</script>

<template>
  <div class="create-order__content">
    <h2 class="create-order__head">Кому доставить подарок?</h2>

    <el-form>
      <el-form-item
        label="Имя получателя"
        class="create-order__item"
        required
      >
        <el-input v-model="recipient.name"/>
      </el-form-item>

      <el-form-item
        label="Телефон"
        class="create-order__item"
        required
      >
        <el-input v-model="recipient.phone"/>
      </el-form-item>

      <el-form-item
        label="Город"
        class="create-order__item"
        required
      >
        <el-select
          v-model="recipient.city"
          filterable
          remote
          placeholder="город получателя"
          :remote-method="suggestCity"
          :loading="loadingCity"
          autocomplete="off"
          class="create-order__select"
        >
          <el-option
            v-for="(city, index) in cities"
            :key="index"
            :label="city"
            :value="city">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="Адрес"
        class="create-order__item"
      >
        <el-select
          v-model="recipient.address"
          filterable
          remote
          placeholder="улица/дом/квартира"
          :remote-method="suggestCity"
          :loading="loadingCity"
          autocomplete="off"
          class="create-order__select"
        >
          <el-option
            v-for="(city, index) in cities"
            :key="index"
            :label="city"
            :value="city">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="Время доставки"
        class="create-order__item"
      >
        <el-select
          v-model="recipient.deliveryTime"
          class="create-order__select"
        >
          <el-option
            label="10 - 14"
            :value="1"
          ></el-option>

          <el-option
            label="14 - 18"
            :value="2"
          ></el-option>

          <el-option
            label="18 - 22"
            :value="2"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="Напишите пожелание"
        class="create-order__item">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          v-model="recipient.comment">
        </el-input>
      </el-form-item>

      <el-button
        @click="submitRecipient"
      >Продолжить</el-button>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/settings/variables";

.create-order-products {

  &__add-btn {
    margin-bottom: $indent-medium;
  }
}
</style>
