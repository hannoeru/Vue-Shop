<template>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-if="page"
      v-model="page"
      color="teal"
      :max="this.pagination.total_pages"
      :max-pages="6"
      :boundary-numbers="true"
    >
    </q-pagination>
  </div>
</template>
<script>
export default {
  props: ['location'],
  data() {
    return {
      current: 6
    };
  },
  computed: {
    page: {
      get() {
        return this.pagination.current_page;
      },
      set(val) {
        const patch =
          this.location == 'products' ? 'admin/getProducts' : 'admin/getOrders';
        this.$store.dispatch(patch, val);
      }
    },
    pagination() {
      return this.$store.state.admin.pagination[this.location];
    }
  }
};
</script>
