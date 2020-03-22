<template>
  <div>
    <q-btn
      color="primary"
      label="更多"
      @click="getProduct"
      :loading="loading == item.id"
    />
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width:80vw;max-width:700px">
        <q-card-section class="row">
          <div class="text-h6">商品詳細</div>
          <q-space />
          <q-btn
            flat
            icon="fas fa-times"
            v-close-popup
          />
        </q-card-section>
        <q-separator />
        <q-card-section class="row q-pt-none">
          <q-img
            class="col-6 rounded-borders"
            :src="product.imageUrl"
          />
          <div class="col-6 q-pa-lg">
            <q-badge
              outline
              color="orange"
              :label="item.category"
            />
            <div class="text-h6">{{ item.title }}</div>
            <div class="text-subtitle2">{{ item.content }}</div>
            <div class="column q-mt-xl">
              <div
                class="text-body1"
                v-if="!item.price"
              >{{ item.origin_price }} 元</div>
              <del
                class="text-body2"
                v-if="item.price"
              >原價 {{ item.origin_price }} 元</del>
              <div
                class="text-body1"
                v-if="item.price"
              >現在只要 {{ item.price }} 元</div>
            </div>
            <q-select
              outlined
              emit-value
              map-options
              v-model="num"
              :options="selectOptions"
              label="請選擇數量"
            />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions
          align="right"
          class="bg-white text-teal"
        >
          <AddToCart
            :id="product.id"
            :num="num"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
  import AddToCart from "@/components/Front/AddToCart";
  import { mapState, mapGetters } from "vuex";
  export default {
    props: ["item"],
    components: { AddToCart },
    data() {
      return {
        persistent: false,
        product: {},
        num: 1
      };
    },
    computed: {
      ...mapState("front", {
        loading: state => state.loadings.product
      }),
      ...mapGetters("front", ["selectOptions"])
    },
    methods: {
      async getProduct() {
        this.product = await this.$store.dispatch(
          "front/getProduct",
          this.item.id
        );
        this.persistent = (await this.product.id) ? true : false;
      }
    },
    watch: {
      loading: function(val) {
        console.log(val);
      }
    }
  };
</script>
