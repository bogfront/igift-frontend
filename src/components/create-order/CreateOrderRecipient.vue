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
    }
  }),

  methods: {
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
      <el-form-item class="create-order__item">
        <el-input
          v-model="recipient.name"
          placeholder="Имя получателя*"
        />
      </el-form-item>

      <el-form-item class="create-order__item">
        <el-input
          v-model="recipient.phone"
          placeholder="Телефон*"
        />
      </el-form-item>

      <el-form-item class="create-order__item">
        <el-input
          v-model="recipient.city"
          placeholder="Город*"
        />
      </el-form-item>

      <el-form-item class="create-order__item">
        <el-input
          v-model="recipient.address"
          placeholder="Адрес"
        />
      </el-form-item>

      <el-form-item class="create-order__item">
        <el-select
          v-model="recipient.deliveryTime"
          class="create-order__select"
          placeholder="Время доставки"
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

      <el-form-item class="create-order__item">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          placeholder="Напишите пожелание"
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
