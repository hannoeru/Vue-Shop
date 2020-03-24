<template>
  <q-header class="bg-dark">
    <q-toolbar style="height:70px" class="q-px-xl text-grey-6">
      <q-toolbar-title class="text-white">{{ title }}</q-toolbar-title>
      <q-space />
      <MenuCart v-if="$route.path !== '/checkout'" />
      <q-btn flat icon="fas fa-user-circle" to="/login" />
    </q-toolbar>
  </q-header>
</template>
<script>
import MenuCart from '@/components/Front/MenuCart'
import { mapActions } from 'vuex'
export default {
  components: { MenuCart },
  data() {
    return {}
  },
  methods: {
    ...mapActions('login', ['signout'])
  },
  computed: {
    title() {
      return this.$store.state.front.title
    }
  }
}
</script>
