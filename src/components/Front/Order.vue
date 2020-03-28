<template>
  <ValidationObserver
    tag="div"
    class="column q-mt-sm"
    v-slot="{ invalid }"
    ref="check"
  >
    <div class="col q-gutter-sm q-pa-sm">
      <div>Email</div>
      <ValidationProvider
        rules="required|email"
        name="Email"
        v-slot="{ failed, errors }"
        tag="div"
      >
        <q-input
          outlined
          v-model="order.user.email"
          label="請輸入 Email"
          :error="failed"
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <div>收件人姓名</div>
      <ValidationProvider
        rules="required"
        name="姓名"
        v-slot="{ failed, errors }"
        tag="div"
      >
        <q-input
          outlined
          v-model="order.user.name"
          label="請輸入姓名"
          :error="failed"
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <div>收件人電話</div>
      <ValidationProvider
        rules="required|numeric|length:10"
        name="電話"
        v-slot="{ failed, errors }"
        tag="div"
      >
        <q-input
          outlined
          v-model="order.user.tel"
          label="請輸入電話"
          :error="failed"
          :error-message="errors[0]"
        />
      </ValidationProvider>
      <div>收件人地址</div>
      <ValidationProvider
        rules="required"
        name="地址"
        v-slot="{ failed, errors }"
        tag="div"
      >
        <q-input
          outlined
          v-model="order.user.address"
          label="請輸入地址"
          :error="failed"
          :error-message="errors[0]"
        />
      </ValidationProvider>
    </div>
    <div class="col q-pa-md">
      <q-separator />
    </div>
    <ValidationProvider
      rules="max:50"
      name="留言"
      v-slot="{ failed, errors }"
      tag="div"
      class="col q-gutter-sm q-pa-sm"
    >
      <div>留言</div>
      <q-input
        filled
        type="textarea"
        v-model="order.message"
        label="請輸入留言"
        :error="failed"
        :error-message="errors[0]"
      />
    </ValidationProvider>
    <div class="col q-pa-sm q-my-md row justify-end">
      <q-btn
        color="primary"
        label="送出訂單"
        @click="createOrder(order)"
        :loading="loading"
        :disable="invalid"
      ></q-btn>
    </div>
  </ValidationObserver>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: ['submit'],
  data() {
    return {
      order: {
        user: {}
      }
    };
  },
  computed: mapState('front', {
    loading: state => state.loadings.createOrder
  }),
  methods: mapActions('front', ['createOrder']),
  mounted() {
    this.$watch(() => {
      if (!this.$refs.check.flags.invalid) {
        this.$store.commit(
          'front/checkOrderInfo',
          this.$refs.check.flags.invalid
        );
        if (this.submit) {
          this.createOrder(this.order);
        }
      }
    });
  }
};
</script>
