<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <!-- 广州美团>广州十指恋时尚美甲 -->
      <el-breadcrumb-item :to="{ path: '/' }">{{ $store.state.geo.position.city.replace('市','') }}美团</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">{{ $store.state.geo.position.city.replace('市','') }}{{ decodeURIComponent(keyword) }}</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  }
}
</script>
