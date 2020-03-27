<template>
  <div>
    <q-btn color="primary" label="新增商品" @click="init" v-if="isNew" :loading="loading == 'new'" />
    <q-btn flat color="primary" icon="fas fa-edit" @click="init" v-else :loading="loading == item.id" />
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <ValidationObserver tag="div" class="q-card" style="width:80vw;max-width:700px" v-slot="{ invalid }">
        <q-card-section>
          <div class="text-h6">{{ isNew ? '新增商品' : '編輯商品' }}</div>
        </q-card-section>
        <q-separator />
        <q-card-section horizontal>
          <q-card-section class="col-4 q-pt-md">
            <div class="row">
              <div class="col-12 q-px-md">
                <div class="q-mb-sm">圖片網址</div>
                <q-input outlined v-model="tempProduct.imageUrl" label="請輸入圖片網址" class="q-mb-md" />
                <div class="q-mb-sm">或 上傳圖片</div>
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
                  v-if="tempProduct.imageUrl"
                  :src="tempProduct.imageUrl"
                  spinner-color="white"
                  class="rounded-borders"
                />
              </div>
            </div>
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="row q-pt-md">
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
                v-model="tempProduct.title"
                label="請輸入標題"
                :error="failed"
                :error-message="errors[0]"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              name="分類"
              v-slot="{ failed, errors }"
              tag="div"
              class="col-6 q-px-md"
            >
              <div class="q-mb-sm">分類</div>
              <q-input
                outlined
                v-model="tempProduct.category"
                label="請輸入分類"
                :error="failed"
                :error-message="errors[0]"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required|length:1"
              name="單位"
              v-slot="{ failed, errors }"
              tag="div"
              class="col-6 q-px-md"
            >
              <div class="q-mb-sm">單位</div>
              <q-input
                outlined
                v-model="tempProduct.unit"
                label="請輸入單位"
                :error="failed"
                :error-message="errors[0]"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required|numeric"
              name="原價"
              v-slot="{ failed, errors }"
              tag="div"
              class="col-6 q-px-md"
            >
              <div class="q-mb-sm">原價</div>
              <q-input
                outlined
                type="number"
                v-model="tempProduct.origin_price"
                label="請輸入原價"
                prefix="$"
                :error="failed"
                :error-message="errors[0]"
              />
            </ValidationProvider>
            <ValidationProvider
              rules="required|numeric"
              name="售價"
              v-slot="{ failed, errors }"
              tag="div"
              class="col-6 q-px-md"
            >
              <div class="q-mb-sm">售價</div>
              <q-input
                outlined
                type="number"
                v-model="tempProduct.price"
                label="請輸入售價"
                prefix="$"
                :error="failed"
                :error-message="errors[0]"
              />
            </ValidationProvider>
            <div class="col-12 q-px-sm">
              <q-checkbox v-model="isEnabled" label="是否啟用" />
            </div>
          </q-card-section>
        </q-card-section>
        <q-separator />
        <q-card-section class="row">
          <ValidationProvider
            rules="max:30"
            name="產品描述"
            v-slot="{ failed, errors }"
            tag="div"
            class="col-6 q-pa-md"
          >
            <div class="q-mb-sm">產品描述</div>
            <q-input
              filled
              type="textarea"
              v-model="tempProduct.description"
              label="請輸入產品描述"
              :error="failed"
              :error-message="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider
            rules="max:50"
            name="說明內容"
            v-slot="{ failed, errors }"
            tag="div"
            class="col-6 q-pa-md"
          >
            <div class="q-mb-sm">說明內容</div>
            <q-input
              filled
              type="textarea"
              v-model="tempProduct.content"
              label="請輸入說明內容"
              :error="failed"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
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
import { mapState } from 'vuex';
export default {
  props: ['isNew', 'item'],
  data() {
    return {
      persistent: false,
      tempProduct: {},
      file: null,
      rules: [val => !!val || '* 必填']
    };
  },
  computed: {
    isEnabled: {
      get() {
        return this.tempProduct.is_enabled == 1 ? true : false;
      },
      set(value) {
        this.tempProduct.is_enabled = value ? 1 : 0;
      }
    },
    ...mapState('admin', {
      loading: state => state.loadings.productUpdate,
      uploading: state => state.loadings.uploading
    })
  },
  methods: {
    updateProduct() {
      // this.$store.commit("admin/updateTempProduct", this.tempProduct);
      this.$store.dispatch('admin/updateProduct', {
        isNew: this.isNew,
        product: this.tempProduct
      });
    },
    init() {
      this.persistent = true;
      if (this.isNew) {
        this.tempProduct = {
          is_enabled: 0
        };
      } else {
        this.tempProduct = { ...this.item };
      }
    }
  },
  watch: {
    file: async function() {
      const url = await this.$store.dispatch('admin/uploadFile', this.file);
      await this.$set(this.tempProduct, 'imageUrl', url);
    }
  }
};
</script>
