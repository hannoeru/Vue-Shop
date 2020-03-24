<template>
  <q-page class="q-pa-lg row justify-center align-center">
    <div class="col-4 column justify-center">
      <CheckOrderList :order="order" />
      <CheckUserInfo :order="order" />
      <div align="right" class="q-mt-md">
        <q-btn
          color="negative"
          label="確認付款去"
          :loading="paying"
          v-if="!order.is_paid"
          @click="payOrder(order.id)"
        />
        <q-btn color="primary" label="回首頁" v-else to="/" />
      </div>
    </div>
  </q-page>
</template>
<script>
import CheckUserInfo from '@/components/Front/CheckUserInfo'
import CheckOrderList from '@/components/Front/CheckOrderList'
import { mapState, mapActions } from 'vuex'
export default {
  components: { CheckOrderList, CheckUserInfo },
  computed: {
    ...mapState('front', ['order']),
    ...mapState('front', {
      paying: state => state.loadings.payOrder
    })
  },
  methods: mapActions('front', ['getOrder', 'payOrder']),
  created() {
    this.getOrder(this.$route.params.orderId)
  }
}
</script>
