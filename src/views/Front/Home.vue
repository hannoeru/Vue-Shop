<template>
  <q-layout class="shadow-2 rounded-borders">
    <Header />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>
<script>
import Header from '@/components/Front/Header'
export default {
  components: { Header },
  data() {
    return {}
  }
}
</script>
