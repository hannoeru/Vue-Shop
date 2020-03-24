<template>
  <q-markup-table flat>
    <thead>
      <tr>
        <th class="text-left">品名</th>
        <th class="text-right">數量</th>
        <th class="text-right">單價</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in order.products" :key="item.id">
        <td class="text-left">{{ item.product.title }}</td>
        <td class="text-right">{{ item.qty }}/{{ item.product.unit }}</td>
        <td class="text-right">{{ item.final_total | currency }}</td>
      </tr>
      <tr>
        <td class="text-right" colspan="2">總計</td>
        <td class="text-right">{{ order.total | currency }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>
<script>
export default {
  props: ['order']
}
</script>
