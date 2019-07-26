<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="item in list"
        :key="item.id"
        @click="handleSelect(item.name)"
      >{{ item.name }}</dd>
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
    const { status, data: { city }} = await this.$axios.get('/geo/hotCity')
    if (status === 200) {
      let wantArray
      for (const value of city) {
        wantArray = [...value.value]
        for (const value of wantArray) {
          if (value.hot === true) {
            this.list.push(value)
          }
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

<style lang="scss">
@import "@/assets/css/changeCity/hot.scss";
</style>
