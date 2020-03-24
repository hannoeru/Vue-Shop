<template>
  <q-btn
    outline
    color="red"
    icon="fas fa-shopping-bag"
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
      this.$store.dispatch('front/addToCart', [this.id, this.num])
    }
  }
}
</script>
