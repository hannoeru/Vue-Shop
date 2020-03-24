<template>
  <div>
    <q-btn
      outline
      color="primary"
      label="查看更多"
      @click="getProduct"
      :loading="loading == item.id"
    />
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card dark style="width:80vw;max-width:700px">
        <q-card-section class="row">
          <div class="text-h6">商品詳細</div>
          <q-space />
          <q-btn flat icon="fas fa-times" v-close-popup />
        </q-card-section>
        <q-separator dark />
        <q-card-section class="row q-pt-none">
          <div class="col-6 q-pa-md">
            <q-img class="rounded-borders" :src="product.imageUrl" />
          </div>

          <div class="col-6 q-pa-lg">
            <q-badge outline color="orange" :label="item.category" />
            <div class="text-h6">{{ item.title }}</div>
            <div class="text-subtitle2">{{ item.content }}</div>
            <div class="column q-my-xl">
              <div class="text-body1" v-if="!item.price">
                {{ item.origin_price }} 元
              </div>
              <del class="text-body2" v-if="item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <div class="text-body1" v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </div>
            <q-select
              dark
              outlined
              emit-value
              map-options
              v-model="num"
              :options="selectOptions"
              label="請選擇數量"
            />
          </div>
        </q-card-section>
        <q-separator dark />
        <q-card-actions align="right">
          <AddToCart :id="product.id" :num="num" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import AddToCart from '@/components/Front/AddToCart'
import { mapState, mapGetters } from 'vuex'
export default {
  props: ['item'],
  components: { AddToCart },
  data() {
    return {
      persistent: false,
      product: {},
      num: 1
    }
  },
  computed: {
    ...mapState('front', {
      loading: state => state.loadings.product
    }),
    ...mapGetters('front', ['selectOptions'])
  },
  methods: {
    async getProduct() {
      this.product = await this.$store.dispatch(
        'front/getProduct',
        this.item.id
      )
      this.persistent = (await this.product.id) ? true : false
    }
  }
}
</script>
