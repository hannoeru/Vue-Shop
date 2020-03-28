<template>
  <q-td :props="props">
    <q-icon
      name="fas fa-check"
      color="positive"
      v-if="props.row.is_enabled == 1"
    />
    <q-icon name="fas fa-times" color="negative" v-else></q-icon>
  </q-td>
</template>
<script>
export default {
  props: ['props']
};
</script>
