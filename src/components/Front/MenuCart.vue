<template>
  <q-btn flat icon="fas fa-shopping-bag">
    <q-badge
      color="red"
      floating
      transparent
      v-if="cartData.carts.length !== 0"
      >{{ cartData.carts.length }}</q-badge
    >
    <q-menu>
      <q-list style="min-width: 300px">
        <q-item class="q-py-md">
          <q-item-section class="text-h6">購物車</q-item-section>
          <q-item-section align="right">
            <q-btn flat icon="fas fa-times" class="text-grey-8" v-close-popup />
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item v-for="item in cartData.carts" :key="item.id">
          <q-item-section class="q-pa-sm">
            <div class="text-body1 text-weight-medium">
              {{ item.product.title }}
            </div>
            <div class="text-weight-light text-grey-8">
              {{ item.product.description }}
            </div>
            <div class="q-mt-sm text-weight-regular text-grey-9">
              {{ item.product.price | currency }}
            </div>
          </q-item-section>
          <div class="column justify-end q-px-sm">
            <div class="row">
              <div class="q-ma-sm">
                {{ item.product.num }}/{{ item.product.unit }}
              </div>
              <q-btn
                flat
                color="negative"
                icon="fas fa-trash-alt"
                size="sm"
                @click="deleteCart(item.id)"
                :loading="loading == item.id"
              />
            </div>
          </div>
          <q-separator class="absolute-bottom" />
        </q-item>
        <q-item class="column">
          <div class="row q-my-sm">
            <q-item-section class="text-grey-9">合計</q-item-section>
            <q-item-section class="text-right text-weight-medium">
              {{ cartData.total | currency }}
            </q-item-section>
          </div>
          <div class="q-ma-sm">
            <q-btn
              color="black"
              class="full-width "
              label="結帳"
              to="/checkout"
            />
          </div>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return { coupon: '' };
  },
  computed: {
    ...mapState('front', ['cartData']),
    ...mapState('front', {
      loading: (state) => state.loadings.deleteCart,
    }),
  },
  methods: mapActions('front', ['getCarts', 'deleteCart', 'addCouponCode']),
  created() {
    this.getCarts();
  },
};
</script>
