<template>
  <div>
    <q-btn
      color="primary"
      label="新增商品"
      @click="btnClick"
      v-if="isNew"
      :loading="loadings.update == 'new'"
    />
    <q-btn
      flat
      color="primary"
      icon="fas fa-edit"
      @click="btnClick"
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
          <div class="text-h6">{{isNew ? '新增商品' : '編輯商品'}}</div>
        </q-card-section>
        <q-card-section horizontal>
          <q-card-section class="col-4 q-pt-none">
            <div class="row">
              <div class="col-12 q-gutter-sm q-pa-sm">
                <div>圖片網址</div>
                <q-input
                  outlined
                  v-model="tempProduct.imageUrl"
                  label="請輸入圖片網址"
                />
                <div>或 上傳圖片</div>
                <q-file
                  v-model="file"
                  name="poster_file"
                  filled
                  counter
                  label="請選擇圖片"
                  accept=".jpg, image/*"
                  :loading="loadings.uploading"
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
          <q-card-section class="row q-pt-none">
            <div class="col-12 q-gutter-sm q-pa-sm">
              <div>標題</div>
              <q-input
                outlined
                v-model="tempProduct.title"
                label="請輸入標題"
              />
            </div>
            <div class="col-6 q-gutter-sm q-pa-sm">
              <div>分類</div>
              <q-input
                outlined
                v-model="tempProduct.category"
                label="請輸入分類"
              />
            </div>
            <div class="col-6 q-gutter-sm q-pa-sm">
              <div>單位</div>
              <q-input
                outlined
                v-model="tempProduct.unit"
                label="請輸入單位"
              />
            </div>
            <div class="col-6 q-gutter-sm q-pa-sm">
              <div>原價</div>
              <q-input
                outlined
                type="number"
                v-model="tempProduct.origin_price"
                label="請輸入原價"
                prefix="$"
              />
            </div>
            <div class="col-6 q-gutter-sm q-pa-sm">
              <div>售價</div>
              <q-input
                outlined
                type="number"
                v-model="tempProduct.price"
                label="請輸入售價"
                prefix="$"
              />
            </div>
            <div class="col-12 q-pa-sm">
              <q-checkbox
                v-model="isEnabled"
                label="是否啟用"
              />
            </div>
            <div class="col-12 q-pa-sm">
              <q-separator />
            </div>
            <div class="col-12 q-gutter-sm q-pa-sm">
              <div>產品描述</div>
              <q-input
                filled
                type="textarea"
                v-model="tempProduct.description"
                label="請輸入產品描述"
              />
            </div>
            <div class="col-12 q-gutter-sm q-pa-sm">
              <div>說明內容</div>
              <q-input
                filled
                type="textarea"
                v-model="tempProduct.content"
                label="請輸入說明內容"
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
        tempProduct: {},
        file: null
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
      ...mapState("admin", ["loadings"])
    },
    methods: {
      updateProduct() {
        // this.$store.commit("admin/updateTempProduct", this.tempProduct);
        this.$store.dispatch("admin/updateProduct", {
          isNew: this.isNew,
          product: this.tempProduct
        });
      },
      btnClick() {
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
        const url = await this.$store.dispatch("admin/uploadFile", this.file);
        await this.$set(this.tempProduct, "imageUrl", url);
      }
    }
  };
</script>
