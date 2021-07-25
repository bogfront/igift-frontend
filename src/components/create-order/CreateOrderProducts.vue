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
        comment: '',
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
        const { data } = await api.orders.urlMetadata({ url });

        if (data) {
          this.productForm.name = data.title;
          this.productForm.image = data.image;
        }
      } catch (error) {
        console.error(error);
      }
    },

    submitProducts () {
      this.$refs.productForm.validate((valid) => {
        if (valid) {
          this.$store.commit('setOrderProducts', this.productForm);
          this.$router.push({ name: 'create-order-products-submit' })
        } else {
          ElNotification({
            title: 'Неверно заполнена форма',
            message: 'Проверьте правильность заполнения полей',
            duration: 3000,
            position: 'bottom-right'
          })

          return false;
        }
      });
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
        label="Скопируйте URL ссылку на товар"
        class="create-order__item"
        prop="uri"
      >
        <el-input
          v-model="productForm.uri"
          @blur="getProductData(productForm.uri)"
        />
      </el-form-item>

      <el-form-item
        label="Название товара"
        class="create-order__item"
        prop="name"
      >
        <el-input v-model="productForm.name"/>
      </el-form-item>

      <el-form-item
        labe="Количество товаров"
        class="create-order__item"
      >
        <el-select
          v-model="productForm.count"
          class="create-order__select"
        >
          <el-option
            v-for="(item, index) in new Array(10)"
            :key="index"
            :label="`${index + 1} шт.`"
            :value="index + 1"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="Напишите пожелание"
        class="create-order__item"
      >
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          v-model="productForm.comment">
        </el-input>
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
