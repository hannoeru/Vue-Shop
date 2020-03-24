<template>
  <div>
    <q-markup-table flat>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left">品名</th>
          <th class="text-right">數量</th>
          <th class="text-right">單價</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cartData.carts" :key="item.id">
          <td class="text-left">
            <q-btn
              flat
              color="negative"
              icon="fas fa-trash-alt"
              size="sm"
              @click="deleteCart(item.id)"
              :loading="loading == item.id"
            />
          </td>
          <td class="text-left">
            <div>{{ item.product.title }}</div>
            <div class="text-positive" v-if="item.coupon">已套用優惠卷</div>
          </td>
          <td class="text-right">{{ item.qty }}/{{ item.product.unit }}</td>
          <td class="text-right">{{ item.product.price | currency }}</td>
        </tr>
        <tr>
          <td class="text-left"></td>
          <td class="text-left"></td>
          <td class="text-right">總計</td>
          <td class="text-right">{{ cartData.total | currency }}</td>
        </tr>
        <tr v-if="cartData.final_total !== cartData.total">
          <td class="text-left"></td>
          <td class="text-left"></td>
          <td class="text-right">折扣價</td>
          <td class="text-right">{{ cartData.final_total | currency }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return { coupon: '' }
  },
  computed: {
    ...mapState('front', ['cartData']),
    ...mapState('front', {
      loading: state => state.loadings.deleteCart
    })
  },
  methods: mapActions('front', ['getCarts', 'deleteCart', 'addCouponCode']),
  created() {
    this.getCarts()
  }
}
</script>
