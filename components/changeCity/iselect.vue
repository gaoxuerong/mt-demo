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
      @visible-change="ShandleSelect"
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
      pvalue: '', // Current province
      city: [],
      cvalue: '', // City under current provinces
      input: '',
      cities: [] // National city list
    }
  },
  watch: {
    pvalue: async function(newPvalue) {
      const { status, data: { city }} = await this.$axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        this.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        this.cvalue = ''
      }
    }
  },
  mounted: async function() {
    const { status, data: { province }} = await this.$axios.get('/geo/province')
    if (status === 200) {
      this.province = province.map(item => {
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
    querySearchAsync: _.debounce(async function(query, cb) { // _.debounce() Delay function
      if (this.cities.length) {
        cb(this.cities.filter(item => item.value.indexOf(query) > -1)) // Search 北 to show all data with 北
      } else {
        // const { status, data: { city }} = await this.$axios.get('/geo/city', { params: { city: this.cvalue }}) // Online data
        const { status, data: { city }} = await this.$axios.get('/geo/city') // Localized data
        // console.log(city, -1)
        if (status === 200) {
          let wantArray
          const wantCityArray = []
          for (const value of city) {
            wantArray = [...value.value]
            // console.log(wantArray, 2)
            wantArray.map(item => {
              // console.log(item.name)
              wantCityArray.push(item.name)
              // console.log(wantCityArray)
            })
          }
          // console.log(wantCityArray, 3)
          this.cities = wantCityArray.map(item => {
            return {
              value: item
            }
          })
          // console.log(this.cities, 4)
          cb(this.cities.filter(item => item.value.indexOf(query) > -1))
        } else {
          cb([])
        }
      }
    }, 200),
    handleSelect(e) {
      this.$store.commit('geo/setCity', e.value)
    },
    ShandleSelect: async function() {
      // console.log(this.$refs.currentCity.value)
      const temp = this.$refs.currentCity.value
      const id = Math.floor(temp / 10000) * 10000
      // commons.app.js:331 GET http://localhost:3000/geo/province/0 500 (Internal Server Error)
      const { status, data: { city }} = await this.$axios.get(`/geo/province/${id}`)
      if (status === 200) {
        const provinceCity = city.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
        // console.log(provinceCity)
        const currentCity = provinceCity.filter(item => {
          return item.id === temp
        })
        // console.log(currentCity[0].name)
        this.$store.commit('geo/setCity', currentCity[0].name)
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
