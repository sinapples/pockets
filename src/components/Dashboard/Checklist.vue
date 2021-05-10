<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5000"
      hide-default-footer
      hide-default-header
      show-select
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        }
      ],
      desserts: [
        {
          name: 'Wallet',
          icon: 'keys',
          id: 122,
          rank: 1
        },
        {
          name: 'Phone',
          icon: 'keys',
          id: 132322,
          rank: 1
        },
        {
          name: 'Keys',
          icon: 'keys',
          id: 1433222,
          rank: 1
        },
        {
          name: 'Mask',
          icon: 'keys',
          id: 134322,
          rank: 1
        }
      ]
    }
  }
}
</script>

<style></style>
