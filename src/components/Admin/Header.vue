<template>
  <q-header
    elevated
    class="bg-black"
  >
    <q-toolbar>
      <q-btn
        flat
        @click="drawer = !drawer"
        round
        dense
        icon="menu"
      />
      <q-toolbar-title>{{ title }}</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
<script>
  import { mapActions } from "vuex";
  export default {
    data() {
      return {};
    },
    methods: {
      ...mapActions("login", ["signout"])
    },
    computed: {
      drawer: {
        get() {
          return this.$store.state.admin.drawer;
        },
        set(val) {
          this.$store.commit("admin/updateDrawer", val);
        }
      },
      title() {
        return this.$store.state.admin.title;
      }
    }
  };
</script>