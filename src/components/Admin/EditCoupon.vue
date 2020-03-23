<template>
  <div>
    <q-btn
      color="primary"
      label="新增優惠卷"
      @click="init"
      v-if="isNew"
      :loading="loadings.update == 'new'"
    />
    <q-btn
      flat
      color="primary"
      icon="fas fa-edit"
      @click="init"
      v-else
      :loading="loadings.update == item.id"
    />
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <ValidationObserver
        tag="div"
        class="q-card"
        style="width:80vw;max-width:700px"
        v-slot="{ invalid }"
      >
        <q-card-section>
          <div class="text-h6">{{ isNew ? '新增優惠卷' : '編輯優惠卷' }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-card-section class="row q-pt-none">
            <ValidationProvider
              rules="required"
              name="標題"
              v-slot="{ failed, errors }"
              tag="div"
              class="col-12 q-px-md"
            >
              <div class="q-mb-sm">標題</div>
              <q-input
                outlined
                v-model="tempCoupon.title"
                label="請輸入標題"
                :error="failed"
                :error-message="errors[0]"
              />
            </ValidationProvider>
            <div class="col-6 q-pa-md">
              <div class="q-mb-sm">到期日</div>
              <q-date v-model="date" />
            </div>
            <div class="col-6 q-pa-md">
              <ValidationProvider
                rules="required|alpha_num"
                name="優惠碼"
                v-slot="{ failed, errors }"
                tag="div"
              >
                <div class="q-mb-sm">優惠碼</div>
                <q-input
                  outlined
                  v-model="tempCoupon.code"
                  label="請輸入優惠碼"
                  :error="failed"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider
                rules="required|numeric|max_value:100"
                name="折扣百分比"
                v-slot="{ failed, errors }"
                tag="div"
              >
                <div class="q-mb-sm">折扣百分比</div>
                <q-input
                  outlined
                  type="number"
                  v-model="tempCoupon.percent"
                  label="請輸入折扣百分比"
                  suffix="%"
                  :error="failed"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
              <q-checkbox v-model="isEnabled" label="是否啟用" />
            </div>
          </q-card-section>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="negative" label="取消" v-close-popup />
          <q-btn
            color="primary"
            :label="isNew ? '新增' : '更新'"
            :disable="invalid"
            v-close-popup
            @click="updateProduct"
          />
        </q-card-actions>
      </ValidationObserver>
    </q-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: ['isNew', 'item'],
  data() {
    return {
      persistent: false,
      tempCoupon: {},
      file: null,
      rules: [val => !!val || '* 必填']
    }
  },
  computed: {
    isEnabled: {
      get() {
        return this.tempCoupon.is_enabled == 1 ? true : false
      },
      set(value) {
        this.tempCoupon.is_enabled = value ? 1 : 0
      }
    },
    date: {
      get() {
        const date = new Date(this.tempCoupon.due_date * 1000)
        const time =
          date.getFullYear() +
          '/' +
          ('0' + (date.getMonth() + 1)).slice(-2) +
          '/' +
          ('0' + date.getDate()).slice(-2)
        return `${time}`
      },
      set(val) {
        const timestamp = Math.floor(new Date(val) / 1000)
        this.$set(this.tempCoupon, 'due_date', timestamp)
      }
    },
    ...mapState('admin', ['loadings'])
  },
  methods: {
    updateProduct() {
      this.$store.dispatch('admin/updateCoupon', {
        isNew: this.isNew,
        coupon: this.tempCoupon
      })
    },
    init() {
      this.persistent = true
      if (this.isNew) {
        this.tempCoupon = {
          is_enabled: 0
        }
        this.$set(this.tempCoupon, 'due_date', Math.floor(new Date() / 1000))
      } else {
        this.tempCoupon = { ...this.item }
      }
    }
  }
}
</script>
