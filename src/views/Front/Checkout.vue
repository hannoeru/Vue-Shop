<template>
  <q-page class="q-pa-lg row justify-center items-center">
    <div class="col-6">
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step :name="1" title="確認訂單內容" icon="fas fa-shopping-bag" :done="step > 1">
          <Cart />
          <Coupon />
        </q-step>

        <q-step :name="2" title="填寫用戶資料" icon="assignment" :done="step > 2">
          <Order :submit="submit" />
        </q-step>

        <q-step :name="3" title="顯示訂單" icon="fas fa-paper-plane">
          <CheckUserInfo :order="order" />
        </q-step>

        <q-step :name="4" title="付款" icon="fas fa-credit-card">
          <CheckOrderList :order="order" />
          <q-btn
            color="negative"
            label="確認付款去"
            :loading="paying"
            v-if="!order.is_paid"
            @click="payOrder(order.id)"
          />
        </q-step>

        <template v-slot:navigation>
          <q-separator />
          <div align="right" class="q-pa-md">
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="返回"
              class="q-ml-sm"
            />
            <q-btn
              @click="next"
              color="primary"
              :label="step === 4 ? '回到首頁' : '下一步'"
              :disabled="step === 2 && checkOrderInfo"
            />
          </div>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>
<script>
import CheckUserInfo from '@/components/Front/CheckUserInfo';
import CheckOrderList from '@/components/Front/CheckOrderList';
import Coupon from '@/components/Front/Coupon';
import Cart from '@/components/Front/Cart';
import Order from '@/components/Front/Order';
import { mapState, mapActions } from 'vuex';
export default {
  components: { Cart, Coupon, Order, CheckUserInfo, CheckOrderList },
  data() {
    return {
      step: 1,
      submit: false
    };
  },
  computed: {
    ...mapState('front', ['checkOrderInfo', 'order']),
    ...mapState('front', {
      paying: state => state.loadings.payOrder
    })
  },
  methods: {
    ...mapActions('front', ['payOrder']),
    next() {
      if (this.step === 2) {
        this.submit = true;
      } else {
        this.$refs.stepper.next();
      }
    }
  }
};
</script>
