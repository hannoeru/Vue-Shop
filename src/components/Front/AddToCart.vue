<template>
  <q-btn
    color="primary"
    icon="fas fa-cart-plus"
    label="加入購物車"
    @click="addToCart"
    :loading="loading == id"
  />
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['id', 'num'],
  computed: mapState('front', {
    loading: state => state.loadings.addToCart
  }),
  methods: {
    async addToCart() {
      console.log(this.id, this.num)
      this.$store.dispatch('front/addToCart', [this.id, this.num])
    }
  }
}
</script>
