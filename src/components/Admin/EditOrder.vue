<template>
  <div>
    <q-btn flat color="primary" icon="fas fa-edit" @click="init" :loading="loading == item.id" />
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width:80vw;max-width:700px">
        <q-card-section>
          <div class="text-h6">修改訂單</div>
        </q-card-section>
        <q-card-section horizontal>
          <q-card-section class="col-4 q-pt-none">
            <div class="row">
              <div class="col-12 q-gutter-sm q-pa-sm">
                <div>圖片網址</div>
                <q-input outlined v-model="tempOrder.imageUrl" label="請輸入圖片網址" />
                <div>或 上傳圖片</div>
                <q-file
                  v-model="file"
                  name="poster_file"
                  filled
                  counter
                  label="請選擇圖片"
                  accept=".jpg, image/*"
                  :loading="uploading"
                />
                <q-img
                  v-if="tempOrder.imageUrl"
                  :src="tempOrder.imageUrl"
                  spinner-color="white"
                  class="rounded-borders"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="row q-pt-none">
            <div class="col-12 q-gutter-sm q-pa-sm">
              <div>標題</div>
              <q-input outlined v-model="tempOrder.title" label="請輸入標題" :rules="rules" />
            </div>
            <div class="col-6 q-gutter-sm q-pa-sm">
              <div>分類</div>
              <q-input outlined v-model="tempOrder.category" label="請輸入分類" :rules="rules" />
            </div>
            <div class="col-6 q-gutter-sm q-pa-sm">
              <div>單位</div>
              <q-input outlined v-model="tempOrder.unit" label="請輸入單位" :rules="rules" />
            </div>
            <div class="col-6 q-gutter-sm q-pa-sm">
              <div>原價</div>
              <q-input
                outlined
                type="number"
                v-model="tempOrder.origin_price"
                label="請輸入原價"
                prefix="$"
                :rules="rules"
              />
            </div>
            <div class="col-6 q-gutter-sm q-pa-sm">
              <div>售價</div>
              <q-input outlined type="number" v-model="tempOrder.price" label="請輸入售價" prefix="$" :rules="rules" />
            </div>
            <div class="col-12 q-pa-sm">
              <q-checkbox v-model="isEnabled" label="是否啟用" />
            </div>
            <div class="col-12 q-pa-sm">
              <q-separator />
            </div>
            <div class="col-12 q-gutter-sm q-pa-sm">
              <div>產品描述</div>
              <q-input filled type="textarea" v-model="tempOrder.description" label="請輸入產品描述" />
              <div>說明內容</div>
              <q-input filled type="textarea" v-model="tempOrder.content" label="請輸入說明內容" />
            </div>
          </q-card-section>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="取消" v-close-popup />
          <q-btn flat :label="修改" v-close-popup @click="updateOrder" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  props: ['isNew', 'item'],
  data() {
    return {
      persistent: false,
      tempOrder: {},
      file: null,
      rules: [val => !!val || '* 必填']
    };
  },
  computed: {
    isEnabled: {
      get() {
        return this.tempOrder.is_enabled == 1 ? true : false;
      },
      set(value) {
        this.tempOrder.is_enabled = value ? 1 : 0;
      }
    },
    ...mapState('admin', {
      loading: state => state.loadings.orderUpdate,
      uploading: state => state.loadings.uploading
    })
  },
  methods: {
    updateOrder() {
      this.$store.dispatch('admin/updateOrder', {
        isNew: this.isNew,
        product: this.tempOrder
      });
    },
    init() {
      this.persistent = true;
      if (this.isNew) {
        this.tempOrder = {
          is_enabled: 0
        };
      } else {
        this.tempOrder = { ...this.item };
      }
    }
  },
  watch: {
    file: async function() {
      const url = await this.$store.dispatch('admin/uploadFile', this.file);
      await this.$set(this.tempOrder, 'imageUrl', url);
    }
  }
};
</script>
