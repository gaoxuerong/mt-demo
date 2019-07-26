<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item"
      >
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section"
    >
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd>
        <span
          v-for="(c, index) in item.city"
          :key="index"
          @click="handleSelect(c)"
        >{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import pyjs from 'js-pinyin'

export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: []
    }
  },
  async mounted() {
    const blocks = []
    const { status, data: { city }} = await this.$axios.get('/geo/city')
    if (status === 200) {
      let p
      let c
      const d = {}
      let wantArray
      for (const value of city) {
        wantArray = [...value.value]
        for (const value of wantArray) {
          p = pyjs
            .getFullChars(value.name)
            .toLocaleLowerCase()
            .slice(0, 1) // p: City initials lowercase pinyin
          c = p.charCodeAt(0) // Initial letter lowercase pinyin ascii
          if (c > 96 && c < 123) { // a-z
            if (!d[p]) {
              d[p] = []
            }
            d[p].push(value.name)
          }
        }
      }
      for (const [k, v] of Object.entries(d)) { // Get the corresponding key-value pair
        blocks.push({
          title: k.toUpperCase(),
          city: v
        })
      }
      blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0)) // Sort
      this.block = blocks
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
@import "@/assets/css/changeCity/categroy.scss";
</style>
