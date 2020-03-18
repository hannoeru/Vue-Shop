<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-blue-grey-10 column justify-center items-center">
        <q-card class="login q-pa-lg shadow-6">
          <q-card-section>
            <div class="text-h6">Login</div>
          </q-card-section>
          <q-card-section class="q-pb-lg">
            <q-form class="q-gutter-y-md column" @submit="signin">
              <q-input
                outlined
                v-model="username"
                type="text"
                label="username"
              />
              <q-input
                outlined
                v-model="password"
                type="password"
                label="password"
              />
              <q-btn
                unelevated
                color="blue"
                size="lg"
                class="full-width q-mt-lg"
                label="Login"
                type="submit"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  methods: {
    ...mapActions('login', ['signin'])
  },
  computed: {
    username: {
      get() {
        return this.$store.state.login.user.username
      },
      set(val) {
        this.$store.commit('login/updateUsername', val)
      }
    },
    password: {
      get() {
        return this.$store.state.login.user.password
      },
      set(val) {
        this.$store.commit('login/updatePassword', val)
      }
    },
    message: function() {
      return this.$store.state.login.message
    }
  },
  watch: {
    message: function(msg) {
      this.$q.notify({
        type: 'positive',
        message: msg
      })
    }
  }
}
</script>
<style lang="sass">
.login
  width: 100%
  max-width: 350px
</style>
