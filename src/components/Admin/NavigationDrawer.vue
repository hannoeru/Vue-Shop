<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense>
      <v-list-item>
        <v-list-item-action>
          <v-icon>fas fa-boxes</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>產品列表</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>fas fa-list-alt</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>訂單列表</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-icon>fas fa-ticket-alt</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>優惠券</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: ['drawer']
}
</script>
