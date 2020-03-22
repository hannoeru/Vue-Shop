const headers = {
  products: [
    {
      name: 'start',
      label: '分類',
      align: 'left',
      field: row => row.category,
      format: val => `${val}`,
      sortable: false
    },
    { name: 'title', label: '名稱', align: 'left', field: 'title' },
    {
      name: 'origin_price',
      label: '原價',
      align: 'right',
      field: 'origin_price',
      sortable: true
    },
    {
      name: 'price',
      label: '售價',
      align: 'right',
      field: 'price',
      sortable: true
    },
    {
      name: 'is_enabled',
      label: '是否啟用',
      align: 'center',
      field: 'is_enabled'
    },
    {
      name: 'edit',
      label: '編輯',
      align: 'center',
      field: 'edit',
      style: 'width: 200px'
    }
  ],
  orders: [
    {
      name: 'time',
      label: '購買時間',
      align: 'left',
      field: 'create_at',
      sortable: true
    },
    {
      name: 'email',
      label: 'Email',
      align: 'left',
      field: 'user'
    },
    {
      name: 'item',
      label: '購買款項',
      align: 'left'
    },
    {
      name: 'total',
      label: '應付金額',
      align: 'left',
      field: 'total',
      sortable: true
    },
    {
      name: 'paid',
      label: '是否付款',
      align: 'left',
      field: 'is_paid'
    }
  ],
  coupons: [
    {
      name: 'name',
      label: '名稱',
      align: 'left',
      field: 'title'
    },
    {
      name: 'percent',
      label: '折扣百分比(%)',
      align: 'right',
      field: 'percent',
      format: val => `${val}%`
    },
    {
      name: 'due_date',
      label: '到期日',
      align: 'right',
      field: 'due_date'
    },
    {
      name: 'is_enabled',
      label: '是否啟用',
      align: 'center',
      field: 'is_enable'
    },
    {
      name: 'edit',
      label: '編輯',
      align: 'center'
    }
  ]
}
export default headers
