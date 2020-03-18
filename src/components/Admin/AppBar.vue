<template>
  <v-app-bar
    app
    clipped-left
  >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>後台管理</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="signout">
      登出
    </v-btn>
  </v-app-bar>
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
      }
    }
  };
</script>