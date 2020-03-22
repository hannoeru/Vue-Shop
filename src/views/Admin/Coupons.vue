<template>
  <q-page class="q-pa-lg">
    <q-table
      title="商品"
      :data="coupons"
      :columns="headers"
      row-key="name"
      :loading="loading"
      :pagination="pagination"
    >
      <template v-slot:top>
        <div class="text-h6">優惠卷列表</div>
        <q-space />
        <EditCoupon :isNew="true" />
      </template>
      <template v-slot:body-cell-due_date="props">
        <q-td :props="props">
          {{ props.row.due_date | date }}
        </q-td>
      </template>
      <template v-slot:body-cell-is_enabled="props">
        <isEnabled :props="props" />
      </template>
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <div class="row justify-center">
            <EditCoupon
              :isNew="false"
              :item="props.row"
            />
            <DeleteCoupon :item="props.row" />
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
<script>
  import EditCoupon from "@/components/Admin/EditCoupon";
  import DeleteCoupon from "@/components/Admin/DeleteCoupon";
  import isEnabled from "@/components/Admin/Table/isEnabled";
  import { mapState, mapActions } from "vuex";
  export default {
    components: { EditCoupon, DeleteCoupon, isEnabled },
    methods: {
      ...mapActions("admin", ["getCoupons"])
    },
    computed: {
      ...mapState("admin", ["coupons"]),
      ...mapState("admin", {
        loading: state => state.loadings.coupons,
        headers: state => state.headers.coupons,
        pagination: state => state.tablePage
      })
    },
    created() {
      this.getCoupons();
    }
  };
</script>