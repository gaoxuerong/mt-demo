<template>
  <div class="m-geo">
    <i class="el-icon-location" />
    {{ $store.state.modules.geo.position }}
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

}
</script>
