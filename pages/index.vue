<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <emenu />
      </el-col>
      <el-col :span="19">
        <elife />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <eartistic />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Emenu from '@/components/index/menu.vue'
import Elife from '@/components/index/life.vue'
import Eartistic from '@/components/index/artistic.vue'
export default {
  components: {
    Emenu,
    Elife,
    Eartistic
  }
}
</script>

<style lang="less">
@import "../assets/css/index/index.less";
</style>
