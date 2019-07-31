<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="navLeave"
    >
      <dt>全部分类</dt>
      <dd
        v-for="(item, index) in this.$store.state.menu"
        :key="index"
        @mouseenter="navEnter"
      >
        <i :class="item.type" />{{ item.name }}<span class="arrow" />
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="detailEnter"
      @mouseleave="detailLeave"
    >
      <template v-for="(item, index) in curdetail.child">
        <h4 :key="index">
          {{ item.title }}
        </h4>
        <span
          v-for="v in item.child"
          :key="v"
        >{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: ''
    }
  },
  computed: {
    curdetail() {
      return this.$store.state.menu.filter((item) => {
        return item.type === this.kind
      })[0]
    }
  },
  methods: {
    navEnter(e) {
      this.kind = e.target.querySelector('i').className // e.target: Current element, querySelector: get <i></i>
    },
    navLeave() {
      this._timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    detailEnter() {
      clearTimeout(this._timer)
    },
    detailLeave() {
      this.kind = ''
    }
  }
}
</script>

<style lang="less">
</style>
