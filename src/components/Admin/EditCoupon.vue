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
      <q-card style="width:80vw;max-width:700px">
        <q-card-section>
          <div class="text-h6">{{isNew ? '新增優惠卷' : '編輯優惠卷'}}</div>
        </q-card-section>
        <q-card-section>
          <q-card-section class="row q-pt-none">
            <div class="col-12 q-gutter-sm q-pa-sm">
              <div>標題</div>
              <q-input
                outlined
                v-model="tempCoupon.title"
                label="請輸入標題"
                :rules="rules"
              />
            </div>
            <div class="col-6 q-gutter-sm q-pa-sm">
              <div>到期日</div>
              <q-date v-model="date" />
            </div>
            <div class="col-6 q-gutter-sm q-pa-sm">
              <div>優惠碼</div>
              <q-input
                outlined
                v-model="tempCoupon.code"
                label="請輸入優惠碼"
                :rules="rules"
              />
              <div>折扣百分比</div>
              <q-input
                outlined
                type="number"
                v-model="tempCoupon.percent"
                label="請輸入折扣百分比"
                suffix="%"
                :rules="[val => !!val || '* 必填',val => val < 100 || '不接受大於100%']"
              />
              <q-checkbox
                v-model="isEnabled"
                label="是否啟用"
              />
            </div>
          </q-card-section>
        </q-card-section>
        <q-card-actions
          align="right"
          class="bg-white text-teal"
        >
          <q-btn
            flat
            label="取消"
            v-close-popup
          />
          <q-btn
            flat
            :label="isNew ? '新增' : '更新'"
            v-close-popup
            @click="updateProduct"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
  import { mapState } from "vuex";
  export default {
    props: ["isNew", "item"],
    data() {
      return {
        persistent: false,
        tempCoupon: {},
        file: null,
        rules: [val => !!val || "* 必填"]
      };
    },
    computed: {
      isEnabled: {
        get() {
          return this.tempCoupon.is_enabled == 1 ? true : false;
        },
        set(value) {
          this.tempCoupon.is_enabled = value ? 1 : 0;
        }
      },
      date: {
        get() {
          const date = new Date(this.tempCoupon.due_date * 1000);
          const time =
            date.getFullYear() +
            "/" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "/" +
            ("0" + date.getDate()).slice(-2);
          return `${time}`;
        },
        set(val) {
          const timestamp = Math.floor(new Date(val) / 1000);
          this.$set(this.tempCoupon, "due_date", timestamp);
        }
      },
      ...mapState("admin", ["loadings"])
    },
    methods: {
      updateProduct() {
        this.$store.dispatch("admin/updateCoupon", {
          isNew: this.isNew,
          coupon: this.tempCoupon
        });
      },
      init() {
        this.persistent = true;
        if (this.isNew) {
          this.tempCoupon = {
            is_enabled: 0
          };
          this.$set(this.tempCoupon, "due_date", Math.floor(new Date() / 1000));
        } else {
          this.tempCoupon = { ...this.item };
        }
      }
    }
  };
</script>
