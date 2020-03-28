<template>
  <q-page class="q-pa-lg">
    <q-table
      title="商品"
      :data="sortOrder"
      :columns="headers"
      row-key="name"
      :loading="loading"
      :separator="separator"
      :pagination="pagination"
    >
      <template v-slot:top>
        <div class="text-h6">訂單列表</div>
        <q-space />
      </template>
      <template v-slot:body-cell-time="props">
        <q-td :props="props">
          {{ props.row.create_at | date }}
        </q-td>
      </template>
      <template v-slot:body-cell-email="props">
        <q-td :props="props">
          <span v-if="props.row.user">{{ props.row.user.email }}</span>
        </q-td>
      </template>
      <template v-slot:body-cell-item="props">
        <q-td :props="props">
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              icon="fas fa-stream"
              label="商品列表"
            >
              <q-item
                v-ripple
                v-for="(product, i) in props.row.products"
                :key="i"
              >
                <q-item-section>
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </q-item-section>
              </q-item>
            </q-expansion-item>
          </q-list>
        </q-td>
      </template>
      <template v-slot:body-cell-paid="props">
        <q-td :props="props">
          <strong v-if="props.row.is_paid" class="text-positive">已付款</strong>
          <span v-else class="text-grey-5">尚未起用</span>
        </q-td>
      </template>
      <template v-slot:bottom> </template>
    </q-table>
    <Pagination location="orders" />
  </q-page>
</template>
<script>
import Pagination from '@/components/Admin/Pagination';
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
  components: { Pagination },
  methods: {
    ...mapActions('admin', ['getOrders'])
  },
  computed: {
    ...mapGetters('admin', ['sortOrder']),
    ...mapState('admin', ['orders', 'separator']),
    ...mapState('admin', {
      loading: state => state.loadings.orders,
      pagination: state => state.tablePage,
      headers: state => state.headers.orders
    })
  },
  created() {
    this.getOrders();
  }
};
</script>
