<template>
  <div class="m-geo">
    <i class="el-icon-location" />
    {{ position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity"
    >
      切换城市
    </nuxt-link>
  </div>
</template>
<script>
export default {
  computed: {
    position() {
      return this.$store.state.position
    }
  }
}
</script>
