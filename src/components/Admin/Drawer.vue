<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="500"
    bordered
    content-class="bg-grey-3"
  >
    <q-scroll-area class="fit">
      <q-list v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          clickable
          :active="menuItem.label === 'Outbox'"
          v-ripple
          :to="menuItem.link"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" :color="menuItem.iconColor" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
        <q-separator v-if="menuItem.separator" />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
<script>
// import { mapState } from "vuex";
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.admin.drawer;
      },
      set(val) {
        this.$store.commit('admin/updateDrawer', val);
      }
    },
    menuList() {
      return this.$store.state.admin.menuList;
    }
  }
};
</script>
