<template>
  <q-markup-table flat class="q-mt-lg">
    <tbody>
      <tr>
        <td class="text-left text-weight-bold">Email</td>
        <td class="text-left" colspan="2">{{ order.user.email }}</td>
      </tr>
      <tr>
        <td class="text-left text-weight-bold">姓名</td>
        <td class="text-left" colspan="2">{{ order.user.name }}</td>
      </tr>
      <tr>
        <td class="text-left text-weight-bold">收件人電話</td>
        <td class="text-left" colspan="2">{{ order.user.tel }}</td>
      </tr>
      <tr>
        <td class="text-left text-weight-bold">收件人地址</td>
        <td class="text-left" colspan="2">{{ order.user.address }}</td>
      </tr>
      <tr>
        <td class="text-left text-weight-bold">付款狀態</td>
        <td class="text-left" colspan="2">
          <div v-if="order.is_paid" class="text-positive">
            已付款
          </div>
          <div v-else>尚未付款</div>
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>
<script>
export default {
  props: ['order']
};
</script>
