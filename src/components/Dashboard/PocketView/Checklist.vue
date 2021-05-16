<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="itemList"
      :items-per-page="5000"
      hide-default-footer
      hide-default-header
      show-select
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
// import activities from '@/store/activities'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

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
  },
  computed: {
    ...mapGetters('activities', ['isActivityDeletionPending']),
    ...mapState('activities', ['activities', 'selectedEditActivity']),
    ...mapState('app', ['networkOnLine']),
    itemList() {
      if (this.activities) {
        const index = this.activities.findIndex(
          element => element.name === 'Always Bring'
        )
        console.log(index)
        return this.activities[index].items
      }
      return []
    }
  },
  methods: {
    ...mapMutations('activities', ['setSelectedEditActivity']),
    ...mapActions('activities', ['deleteUserActivity', 'updateUserActivity'])
  }
}
</script>

<style></style>
