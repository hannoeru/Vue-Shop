<template>
  <div>
    <NavigationDrawer :drawer="drawer" />
    <AppBar />
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex shrink> </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <Footer />
  </div>
</template>
<script>
import NavigationDrawer from '@/components/Admin/NavigationDrawer'
import AppBar from '@/components/Admin/AppBar'
import Footer from '@/components/Admin/Footer'
export default {
  components: {
    NavigationDrawer,
    AppBar,
    Footer
  },
  data() {
    return {
      drawer: null
    }
  }
}
</script>
