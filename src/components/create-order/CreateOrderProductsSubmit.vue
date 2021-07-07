<script>
const DATA_PARAMS = {
  uri: '',
  name: '',
  count: 1,
  comment: ''
}

export default {
  name: "CreateOrderProductsSubmit",

  data: () => ({
    giftsCount: 1
  }),

  mounted () {
    this.$store.commit('setOrderStep', 0);
  },

  methods: {
    submitGiftsCount () {
      this.$store.commit('setGiftsCount', this.giftsCount);
      this.$router.push({ name: 'create-order-design' })
    }
  }
}
</script>

<template>
  <div class="create-order__content">
    <h2 class="create-order__head">Упаковываем в один подарок <br>
      или подарков будет несколько?</h2>

    <el-form>
      <el-form-item class="create-order__item">
        <div>
          <el-radio v-model="giftsCount" :label="1">Это один и тот же подарок</el-radio>
        </div>
        <div>
          <el-radio v-model="giftsCount" :label="2">Хочу упаковать несколько подарков</el-radio>
        </div>
      </el-form-item>

      <el-button
        @click="submitGiftsCount"
      >Продолжить</el-button>
    </el-form>
  </div>
</template>

<style lang="scss">
@import "../../styles/settings";

.create-order-steps {

  .el-step__head {

    &.is-finish {
      color: #fff !important;
      border-color: #8967FF !important;

      .el-step__icon {
        background: #8967FF;
      }

      .el-step__line {
        background: #8967FF !important;
      }
    }

    &.is-process {
      color: #8967FF !important;
      border-color: #8967FF !important;
    }

    &.is-wait {

      .el-step__icon {
        color: $dark-color;
        background: #F5F5F5;
      }
    }
  }
}
</style>
