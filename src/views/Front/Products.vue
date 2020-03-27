<template>
  <q-page class="q-pa-lg" style="background: #bfbfbf">
    <div class="row justify-start">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="item in products" :key="item.id">
        <ProductCard :item="item" />
      </div>
    </div>
  </q-page>
</template>
<script>
import ProductCard from '@/components/Front/ProductCard';
import { mapState, mapActions } from 'vuex';
export default {
  components: { ProductCard },
  computed: mapState('front', ['products']),
  methods: mapActions('front', ['getAllProducts']),
  created() {
    this.getAllProducts();
  }
};
</script>
