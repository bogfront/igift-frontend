<script>
const DATA_PARAMS = {
  uri: '',
  name: '',
  count: 1,
  comment: ''
}

export default {
  name: "CreateOrderProducts",

  data: () => ({
    products: []
  }),

  mounted () {
    this.addProduct()
  },

  methods: {
    addProduct () {
      this.products.push(Object.assign({}, DATA_PARAMS))
    },

    submitProducts () {
      this.products = this.products.map((product, index) => product.id = index);
      this.$store.commit('setOrderProducts', this.products);
      this.$router.push({ name: 'create-order-products-submit' })
    }
  }
}
</script>

<template>
  <div class="create-order__content">
    <h2 class="create-order__head">Укажите товары, которые будут в посылке</h2>

    <el-form>
      <template
        v-for="(product, index) in products"
        :key="index"
      >
        <h3 v-if="products.length > 1">Товар {{ index + 1 }}</h3>

        <el-form-item
          label="Скопируйте URL ссылку на товар"
          class="create-order__item"
        >
          <el-input v-model="product.uri"/>
        </el-form-item>

        <el-form-item
          label="Название товара"
          class="create-order__item"
        >
          <el-input v-model="product.name"/>
        </el-form-item>

        <el-form-item
          labe="Количество товаров"
          class="create-order__item"
        >
          <el-select
            v-model="product.count"
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
            v-model="product.comment">
          </el-input>
        </el-form-item>

      </template>

      <el-button
        type="text"
        class="create-order-products__add-btn"
        @click="addProduct"
      >+ Добавить еще товар</el-button>

      <el-button
        @click="submitProducts"
      >Продолжить</el-button>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/settings";

.create-order-products {

  &__add-btn {
    margin-bottom: $indent-medium;
  }
}
</style>
