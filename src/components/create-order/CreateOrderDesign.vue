<script>
export default {
  name: "CreateOrderDesign",

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
    selectDesign (designId) {
      this.$store.commit('setOrderDesign', designId);
    },

    submit () {
      this.$store.commit('setOrderDesignComment', this.comment);

      this.$router.push({ name: 'create-order-recipient' });
    }
  }
}
</script>

<template>
  <div class="create-order-design">
    <h2 class="create-order__head">Выберите дизайн <br>
      и персонализацию</h2>

    <el-form class="">
      <el-form-item class="create-order__item">
        <div class="create-order-design__grid">

          <div
            v-for="(item, index) in new Array(8)"
            :key="index"
            @click="selectDesign(index)"
            class="create-order-design__grid-item"
            :class="{'create-order-design__grid-item_selected': index === selectedDesignId}"
          >
            <img src="" alt="" class="create-order-design__grid-image">
          </div>

        </div>
      </el-form-item>

      <h3 class="text-center">Напишите пожелание<br>
        или от кого подарок</h3>

      <el-form-item class="create-order__item">
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10}"
          placeholder="Если поле оставить пустым подарок станет анонимным"
          v-model="comment">
        </el-input>
      </el-form-item>

      <div class="text-center">
        <el-button
          class="create-order-design__submit"
          @click="submit"
        >Продолжить</el-button>
      </div>

    </el-form>
  </div>
</template>

<style scoped lang="scss">
@import "../../styles/settings/index";

.create-order-design {
  width: 608px;
  margin: auto;

  &__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: $indent-large;
    margin-bottom: $indent-xlarge;
  }

  &__grid-item {
    height: 134px;
    border-radius: $radius-medium;
    overflow: hidden;
    background: pink;
    cursor: pointer;
    position: relative;

    &_selected {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: $pink-color;
        opacity: .85;
      }

      &:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        background: url('../../assets/icons/selected_24px.svg');
      }
    }
  }

  &__submit {
    max-width: 300px;
  }
}
</style>
