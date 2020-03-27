<template>
  <div>
    <q-btn flat color="negative" icon="fas fa-trash-alt" @click="confirm = true" :loading="loading == item.id" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="q-ma-md">確定要刪除此優惠卷？</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="確定" color="negative" v-close-popup @click="deleteProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  props: ['item'],
  data() {
    return {
      confirm: false
    };
  },
  computed: mapState('admin', {
    loading: state => state.loadings.couponDelete
  }),
  methods: {
    async deleteProduct() {
      await this.$store.dispatch('admin/deleteCoupon', this.item.id);
    }
  }
};
</script>
