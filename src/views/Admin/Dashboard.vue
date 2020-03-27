<template>
  <q-layout class="shadow-2 rounded-borders">
    <Header />
    <Drawer />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>
<script>
import Header from '@/components/Admin/Header';
import Drawer from '@/components/Admin/Drawer';
export default {
  components: { Header, Drawer },
  data() {
    return {};
  }
};
</script>
