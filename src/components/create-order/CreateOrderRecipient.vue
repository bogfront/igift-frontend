<script>
import * as api from '../../api'
import {ElNotification} from 'element-plus';

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
    loadingCity: false,

    rules: {
      name: [
        { required: true, message: 'Заполните имя получателя', trigger: 'blur' }
      ],

      phone: [
        { required: true, message: 'Заполните телефон', trigger: 'blur' }
      ],

      city: [
        { required: true, message: 'Заполните город', trigger: 'blur' }
      ]
    }
  }),

  computed: {
    currentOrder () {
      return this.$store.getters.currentOrder;
    }
  },

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

    async submitRecipient () {
      let isValid = true;
      this.$refs.form.validate((valid) => {
        if (!valid) {
          ElNotification({
            title: 'Неверно заполнена форма',
            message: 'Проверьте правильность заполнения полей',
            duration: 3000,
            position: 'bottom-right'
          })

          isValid = false;

          return false;
        }
      });

      if (!isValid) {
        return;
      }

      try {
        await api.orders.comment({
          orderId: this.currentOrder._id,
          comment: this.recipient.comment,
          receiver: {
            name: this.recipient.name,
            phone: this.recipient.phone,
            city: this.recipient.city,
            address: this.recipient.address
          }
        });

        this.$store.commit('setRecipient', this.recipient);
        await this.$router.push({ name: 'create-order-check' });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<template>
  <div class="create-order__content">
    <h2 class="create-order__head">Кому доставить подарок?</h2>

    <el-form
      :model="recipient"
      :rules="rules"
      ref="form"
    >
      <el-form-item
        class="create-order__item"
        prop="name"
      >
        <el-input
          v-model="recipient.name"
          placeholder="Имя получателя *"
        />
      </el-form-item>

      <el-form-item
        class="create-order__item"
        prop="phone"
      >
        <el-input
          v-model="recipient.phone"
          placeholder="Телефон *"
        />
      </el-form-item>

      <el-form-item
        class="create-order__item"
        prop="city"
      >
        <el-select
          v-model="recipient.city"
          filterable
          remote
          placeholder="Город *"
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
        class="create-order__item"
      >
        <el-select
          v-model="recipient.address"
          filterable
          remote
          placeholder="Адрес"
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
        v-if="false"
        class="create-order__item"
      >
        <el-select
          v-model="recipient.deliveryTime"
          placeholder="Время доставки"
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
        class="create-order__item">
        <el-input
          v-model="recipient.comment"
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          placeholder="Напишите пожелание"
        />
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
