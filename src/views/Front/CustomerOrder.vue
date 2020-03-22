<template>
  <q-page class="q-pa-lg">
    <!-- {{ products }} -->
    <div class="row justify-start">
      <div
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
        v-for="item in products"
        :key="item.id"
      >
        <q-card class="q-ma-md">
          <q-card-section
            horizontal
            style="height: 250px"
          >
            <q-img
              class="col-6"
              :src="item.imageUrl"
            />
            <q-card-section>
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
                >現在只要 <br />{{ item.price }} 元</div>
              </div>
            </q-card-section>
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-space />
            <ShowProduct
              :item="item"
              class="q-mr-md"
            />
            <AddToCart
              :id="item.id"
              num="1"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col">
        {{ carts }}
      </div>
    </div>
  </q-page>
</template>
<script>
  import AddToCart from "@/components/Front/AddToCart";
  import ShowProduct from "@/components/Front/ShowProduct";
  import { mapState, mapActions } from "vuex";
  export default {
    components: { ShowProduct, AddToCart },
    computed: mapState("front", ["products", "carts"]),
    methods: mapActions("front", ["getProducts", "getCarts"]),
    created() {
      this.getProducts();
      this.getCarts();
    }
  };
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>