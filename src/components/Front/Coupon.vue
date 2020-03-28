<template>
  <div class="row q-gutter-md q-mt-sm">
    <q-input
      class="col"
      outlined
      label="請輸入優惠卷"
      v-model="coupon"
      :dense="true"
    />
    <q-btn
      outline
      color="primary"
      label="套用"
      @click="addCouponCode(coupon)"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return { coupon: '' };
  },
  methods: mapActions('front', ['addCouponCode'])
};
</script>
