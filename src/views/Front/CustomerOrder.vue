<template>
  <q-page class="q-pa-lg">
    <!-- {{ products }} -->
    <div class="row justify-start" v-if="$route.path !== '/checkout'">
      <div
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        v-for="item in products"
        :key="item.id"
      >
        <ProductCard :item="item" />
      </div>
    </div>
    <q-separator
      class="full-width q-ma-xl"
      v-if="$route.path !== '/checkout'"
    />
    <div class="row justify-center">
      <div class="col-4">
        <Cart />
        <Coupon />
        <div
          class="row justify-center q-my-xl"
          v-if="$route.path !== '/checkout'"
        >
          <q-btn
            color="primary"
            label="下一步"
            @click="scrollToElement($refs.form)"
          />
        </div>
      </div>
    </div>
    <q-separator class="full-width q-ma-xl" />
    <div class="row justify-center" ref="form">
      <div class="col-4">
        <Order />
      </div>
    </div>
  </q-page>
</template>
<script>
import Order from '@/components/Front/Order';
import Coupon from '@/components/Front/Coupon';
import ProductCard from '@/components/Front/ProductCard';
import Cart from '@/components/Front/Cart';
import { scroll } from 'quasar';
const { getScrollTarget, setScrollPosition } = scroll;
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      showForm: false
    };
  },
  components: { Cart, Coupon, Order, ProductCard },
  computed: mapState('front', ['products']),
  methods: {
    ...mapActions('front', ['getProducts']),
    scrollToElement(el) {
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 1000;
      setScrollPosition(target, offset, duration);
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
