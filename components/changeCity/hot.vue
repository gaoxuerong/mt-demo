<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="item of list"
        :key="item"
        @click="handleSelect(item)"
      >
        {{ item }}
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      list: []
    }
  },
  async mounted() {
    const { status, data: { hots } } = await this.$axios.get('/geo/hotCity')
    if (status === 200) {
      for (const value of hots) {
        if (value.name === '市辖区') {
          this.list.push(value.province)
        } else {
          this.list.push(value.name)
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      setPosition: 'geo/setPosition'
    }),
    handleSelect(cityName) {
      this.$store.commit('geo/setCity', cityName)
    }
  }
}
</script>

<style lang="less">
@import "../../assets/css/changeCity/hot.less";
</style>
