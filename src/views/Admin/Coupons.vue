<template>
  <div>
    {{coupons}}
  </div>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  export default {
    computed: {
      ...mapState(["coupons"]),
      ...mapActions(["getCoupons"])
    },
    created() {
      this.getCoupons;
    }
  };
</script>