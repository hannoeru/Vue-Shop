<template>
  <q-page class="q-pa-lg">
    <q-table
      title="商品"
      :data="products"
      :columns="headers"
      row-key="name"
      :loading="loading"
      :separator="separator"
      :pagination="pagination"
    >
      <template v-slot:top>
        <div class="text-h6">商品列表</div>
        <q-space />
        <EditProduct :isNew="true" />
      </template>
      <template v-slot:body-cell-origin_price="props">
        <q-td :props="props">
          {{ props.row.origin_price | currency }}
        </q-td>
      </template>
      <template v-slot:body-cell-price="props">
        <q-td :props="props">
          {{ props.row.price | currency }}
        </q-td>
      </template>
      <template v-slot:body-cell-is_enabled="props">
        <isEnabled :props="props" />
      </template>
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <div class="row justify-center">
            <EditProduct
              :isNew="false"
              :item="props.row"
            />
            <DeleteProduct :item="props.row" />
          </div>
        </q-td>
      </template>
      <template v-slot:bottom>
      </template>
    </q-table>
    <Pagination location="products" />
  </q-page>
</template>

<script>
  import EditProduct from "@/components/Admin/EditProduct";
  import DeleteProduct from "@/components/Admin/DeleteProduct";
  import Pagination from "@/components/Admin/Pagination";
  import isEnabled from "@/components/Admin/Table/isEnabled";
  import { mapState } from "vuex";
  export default {
    components: { DeleteProduct, Pagination, EditProduct, isEnabled },
    data() {
      return {};
    },
    computed: mapState("admin", {
      products: state => state.products,
      headers: state => state.headers.products,
      loading: state => state.loadings.products,
      separator: state => state.separator,
      pagination: state => state.tablePage
    }),
    created() {
      this.$store.dispatch("admin/getProducts");
    }
  };
</script>
