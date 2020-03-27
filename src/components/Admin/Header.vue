<template>
  <q-header class="bg-dark">
    <q-toolbar class="q-px-lg" style="height:70px">
      <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      <q-separator dark vertical inset style="height:54px" class="q-mx-lg" />
      <q-toolbar-title>{{ title }}</q-toolbar-title>
      <q-space />
      <q-btn outline label="登出" @click="signout" />
    </q-toolbar>
  </q-header>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions('login', ['signout'])
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.admin.drawer;
      },
      set(val) {
        this.$store.commit('admin/updateDrawer', val);
      }
    },
    title() {
      return this.$store.state.admin.title;
    }
  }
};
</script>
