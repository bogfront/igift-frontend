<script>
import * as api from '../../api'
import {validURL} from "../../utils";
import {ElNotification} from "element-plus";

export default {
  name: "CreateOrderProducts",

  data () {
    const validateUrl = (rule, value, callback) => {
      if (!validURL(value)) {
        callback(new Error('Неверный формат ссылки'))
      } else {
        callback()
      }

    };

    return {
      productForm: {
        uri: '',
        name: '',
        count: 1,
        description: '',
        image: ''
      },

      rules: {
        uri: [
          { required: true, message: 'Ссылка на товар должна быть указана', trigger: 'blur' },
          { validator: validateUrl, trigger: 'blur' }
        ],

        name: [
          { required: true, message: 'Напишите название товара', trigger: 'blur' }
        ]
      }
    }
  },

  mounted () {
    this.$store.commit('setOrderStep', 0);
  },

  methods: {
    async getProductData (url) {
      if (!validURL(url)) {
        return;
      }

      try {
        this.productForm.name = '';
        this.productForm.image = '';

        const { data } = await api.orders.urlMetadata({ url });

        if (data) {
          this.productForm.name = data.data?.keywords?.split(',')[0] || data.data.title;
          this.productForm.image = data.data.image;
        }
      } catch (error) {
        console.error(error);
      }
    },

    async submitProducts () {
      let isValid = true;

      this.$refs.productForm.validate((valid) => {
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

      try {
        const ownerId = this.$store.getters.userId;

        const { data: product } = await api.product.create({
          url: this.productForm.uri,
          name: this.productForm.name,
          count: +this.productForm.count,
          description: this.productForm.description
        });

        const { data: order } = await api.orders.create({
          products: [ product.data ],
          ownerId
        })

        this.$store.commit('setOrderProducts', product.data);
        this.$store.commit('setCurrentOrder', order.data);
        await this.$router.push({ name: 'create-order-products-submit' });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<template>
  <div class="create-order__content">
    <h2 class="create-order__head">Укажите товары, которые будут в посылке</h2>

    <el-form
      :model="productForm"
      :rules="rules"
      ref="productForm"
    >
      <img
        v-if="productForm.image"
        :src="productForm.image"
        :alt="productForm.name"
        class="create-order-products__image"
      >

      <el-form-item
        class="create-order__item"
        prop="uri"
      >
        <el-input
          v-model="productForm.uri"
          placeholder="Скопируйте URL ссылку на товар"
          @blur="getProductData(productForm.uri)"
        />
      </el-form-item>

      <el-form-item
        class="create-order__item"
        prop="name"
      >
        <el-input
          v-model="productForm.name"
          placeholder="Название товара"
        />
      </el-form-item>

      <el-form-item class="create-order__item">
        <el-select
          v-model="productForm.count"
          class="create-order__select"
          placeholder="Количество товаров"
        >
          <el-option
            v-for="(item, index) in new Array(10)"
            :key="index"
            :label="`${index + 1} шт.`"
            :value="index + 1"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="create-order__item">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          v-model="productForm.description"
          placeholder="Напишите пожелание"
        />
      </el-form-item>

      <el-button @click="submitProducts">Продолжить</el-button>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/settings";

.create-order-products {

  &__add-btn {
    margin-bottom: $indent-medium;
  }

  &__image {
    display: block;
    width: 66px;
    height: 66px;
    border: 1px solid #EDEDED;
    border-radius: 8px;
    object-fit: contain;
    margin: 0 auto $indent-medium;
  }
}
</style>
