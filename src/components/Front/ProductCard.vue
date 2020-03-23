<template>
  <q-card class="q-ma-md">
    <q-card-section
      horizontal
      style="height: 230px"
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
</template>
<script>
  import AddToCart from "@/components/Front/AddToCart";
  import ShowProduct from "@/components/Front/ShowProduct";
  export default {
    props: ["item"],
    components: { ShowProduct, AddToCart }
  };
</script>