<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="products" class="elevation-1">
      <template v-slot:item.is_enabled="{ item }">
        <v-icon v-if="item.is_enabled == 1">check</v-icon>
        <v-icon v-else>close</v-icon>
      </template>
      <template v-slot:item.edit="{}">
        <v-btn class="ma-2" outlined color="success">
          <v-icon left>mdi-pencil</v-icon>編輯
        </v-btn>
        <v-btn class="ma-2" outlined color="error">
          <v-icon left>delete</v-icon> 刪除
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: mapState('admin', {
    products: state => state.products,
    headers: state => state.headers
  }),
  created() {
    this.$store.dispatch('admin/getProducts')
  },
  mounted() {
    console.log(this.products)
  }
}
</script>
