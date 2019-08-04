<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份"
    >
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      ref="currentCity"
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市"
    >
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span class="name">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: []
    }
  },
  watch: {
    pvalue: async function (newPvalue) {
      const { status, data: { city } } = await this.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        this.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        this.cvalue = ''
      }
    }
  },
  mounted: async function () {
    const { status, data: { province } } = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      setPosition: 'geo/setPosition'
    }),
    querySearchAsync: _.debounce(async function (query, cb) {
      if (this.cities.length) {
        cb(this.cities.filter(item => item.value.indexOf(query) > -1))
      } else {
        const { status, data: { city } } = await this.$axios.get('/geo/city', { params: { city: this.cvalue } })
        if (status === 200) {
          this.cities = city.map((item) => {
            return {
              value: item.name
            }
          })
          cb(this.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          // cb([])
        }
      }
    }, 200),
    handleSelect(e) {
      this.$store.commit('geo/setCity', e.value)
    }
  }
}
</script>

<style lang="less">
@import "../../assets/css/changeCity/iselect.less";
</style>
