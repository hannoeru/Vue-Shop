<template>
  <q-page class="q-pa-lg row justify-center align-center">
    <div class="col-4 column justify-center">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-left">品名</th>
            <th class="text-right">數量</th>
            <th class="text-right">單價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="text-left">{{ item.product.title }}</td>
            <td class="text-right">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="text-right">{{ item.final_total | currency }}</td>
          </tr>
          <tr>
            <td class="text-right" colspan="2">總計</td>
            <td class="text-right">{{ order.total | currency }}</td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-markup-table flat class="q-mt-lg">
        <tbody>
          <tr>
            <td class="text-left text-weight-bold">Email</td>
            <td class="text-left" colspan="2">{{ order.user.email }}</td>
          </tr>
          <tr>
            <td class="text-left text-weight-bold">姓名</td>
            <td class="text-left" colspan="2">{{ order.user.name }}</td>
          </tr>
          <tr>
            <td class="text-left text-weight-bold">收件人電話</td>
            <td class="text-left" colspan="2">{{ order.user.tel }}</td>
          </tr>
          <tr>
            <td class="text-left text-weight-bold">收件人地址</td>
            <td class="text-left" colspan="2">{{ order.user.address }}</td>
          </tr>
          <tr>
            <td class="text-left text-weight-bold">付款狀態</td>
            <td class="text-left" colspan="2">
              <div v-if="order.is_paid" class="text-positive">
                已付款
              </div>
              <div v-else>尚未付款</div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <div align="right" class="q-mt-md">
        <q-btn
          color="negative"
          label="確認付款去"
          :loading="paying"
          v-if="!order.is_paid"
          @click="payOrder(order.id)"
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
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
