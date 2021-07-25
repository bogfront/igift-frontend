<script>
import packing from "../../storage/packing.js";

export default {
  name: "CreateOrderDesign",

  data: () => ({
    comment: '',
    showDialog: false,
    gallery: [],
    currentDesignId: null
  }),

  computed: {
    selectedDesignId () {
      return this.$store.getters.orderForm.designId;
    },

    packing () {
      return packing;
    }
  },

  methods: {
    openDesign (pack) {
      this.showDialog = true;
      this.gallery = pack.images;
      this.currentDesignId = pack.id;
    },

    selectDesign () {
      this.$store.commit('setOrderDesign', this.currentDesignId);
      this.showDialog = false;
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
            v-for="item in packing"
            :key="item.id"
            @click="openDesign(item)"
            class="create-order-design__grid-item"
            :class="{'create-order-design__grid-item_selected': item.id === selectedDesignId}"
          >
            <img :src="item.cover" alt="" class="create-order-design__grid-image">
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

  <el-dialog
    v-model="showDialog"
    width="30%"
    center
  >
    <el-carousel
      ref="carousel"
      :autoplay="false"
      arrow="always"
    >
      <el-carousel-item
        v-for="(item, index) in gallery"
        :key="index"
      >
        <img
          :src="item"
          class="create-order-design__carousel-item"
        >
      </el-carousel-item>
    </el-carousel>

    <div class="create-order-design__carousel-preview">
      <div
        v-for="(item, index) in gallery"
        :key="index"
        @click="$refs.carousel.setActiveItem(index)"
      >
        <img
          :src="item"
          alt="">
      </div>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button
          @click="selectDesign"
        >Выбрать</el-button>
      </span>
    </template>
  </el-dialog>
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

  &__grid-image {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  &__carousel-item {
    display: block;
    height: 280px;
    object-fit: contain;
    border-radius: $radius-medium;
    margin: auto;
  }

  &__carousel-preview {
    margin-top: $indent-small;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: $indent-small;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  &__submit {
    max-width: 300px;
  }
}
</style>
