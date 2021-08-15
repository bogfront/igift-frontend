<script>
import { auth } from "../../api";

export default {
  name: "AuthVerify",

  mounted() {
    auth.verify(this.$route.params.token).then(res => {
      this.$router.push({ name: 'login' });
    }).catch(error => {
      console.error(error);
      this.$router.push({ name: 'register' })
    })
  }
}
</script>

<style scoped>

</style>
