<template>
  <v-content>
    <v-container
      fluid
      fill-height
    >
      <v-layout
        align-center
        justify-center
      >
        <v-flex
          xs12
          sm8
          md4
        >
          <v-card class="elevation-12">
            <v-toolbar
              color="primary"
              dark
              flat
            >
              <v-toolbar-title>管理頁面</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="用戶名稱"
                  name="login"
                  prepend-icon="fas fa-user fa-sm"
                  type="text"
                  v-model="username"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="密碼"
                  name="password"
                  prepend-icon="fas fa-lock fa-sm"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click.prevent="signin"
              >登入</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script>
  import { mapActions } from "vuex";
  export default {
    name: "Login",
    methods: {
      ...mapActions("login", ["signin"])
    },
    computed: {
      username: {
        get() {
          return this.$store.state.login.username;
        },
        set(val) {
          this.$store.commit("login/updateUsername", val);
        }
      },
      password: {
        get() {
          return this.$store.state.login.password;
        },
        set(val) {
          this.$store.commit("login/updatePassword", val);
        }
      }
    }
  };
</script>