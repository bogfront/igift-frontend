<script>
export default {
  name: "CreateOrderSteps",

  computed: {
    currentStep () {
      return this.$store.getters.orderStep;
    }
  }
}
</script>

<template>
  <el-steps
    :active="currentStep"
    class="create-order-steps"
  >
    <el-step></el-step>
    <el-step></el-step>
    <el-step></el-step>
  </el-steps>
</template>

<style scoped>

</style>
