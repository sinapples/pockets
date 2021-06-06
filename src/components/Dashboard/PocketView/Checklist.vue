<template>
  <div>
    <span v-if="haveEverything"> You are ready to go </span>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="itemList"
      :items-per-page="5000"
      item-key="name"
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

      selected: []
    }
  },

  watch: {
    itemList() {
      console.log('watch moo')
      this.selected = []
    }
  },
  computed: {
    ...mapGetters('activities', ['isActivityDeletionPending']),
    ...mapState('activities', ['activities', 'selectedEditActivity']),
    ...mapState('app', ['networkOnLine']),

    haveEverything() {
      return (
        this.itemList.length === this.selected.length &&
        this.itemList.length !== 0
      )
    },
    itemList() {
      // if (this.activities) {
      //   const index = this.activities.findIndex(
      //     element => element.name === 'Always Bring'
      //   )
      //   console.log(index)
      //   return this.activities[index].items
      // }
      // return []

      return this.selectedEditActivity.items
    }
  },
  methods: {
    ...mapMutations('activities', ['setSelectedEditActivity']),
    ...mapActions('activities', ['deleteUserActivity', 'updateUserActivity'])
  }
}
</script>

<style></style>
