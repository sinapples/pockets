<template>
  <div class="schedule">
    <!-- {{ alwaysBring }} -->
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
      item-class="schedule-big"
      class="elevation-1"
      @click:row="rowClick"
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

  // watch: {
  //   itemList() {
  //     console.log('watch moo')
  //     this.selected = []
  //   }
  // },
  computed: {
    ...mapGetters('activities', ['isActivityDeletionPending']),
    ...mapState('activities', [
      'activities',
      'selectedEditActivity',
      'selectedActivities'
    ]),
    ...mapState('app', ['networkOnLine']),

    haveEverything() {
      if (this.itemList) {
        return (
          this.itemList.length === this.selected.length &&
          this.itemList.length !== 0
        )
      }
      return false
    },
    itemList() {
      let list = []
      list = this.alwaysBring
      // const moo = []
      if (this.selectedActivities.length > 0) {
        console.log('hello')
        for (
          let index = 0;
          index < this.selectedActivities.length;
          index += 1
        ) {
          const id = this.selectedActivities[index]
          console.log(`found${id}`)
          const selected = this.activities.find(item => {
            return item.id === id
          })
          if (selected) {
            list = list.concat(selected.items)
          }
        }
        // list.concat(moo)
        console.log(list)
        return list
      }
      return list
    },

    alwaysBring() {
      if (this.activities) {
        return this.activities.find(item => {
          return item.name === 'Always Bring'
        }).items
      }

      return []
    }
  },
  methods: {
    ...mapMutations('activities', ['setSelectedEditActivity']),
    ...mapActions('activities', ['deleteUserActivity', 'updateUserActivity']),
    rowClick(item) {
      const index = this.selected.indexOf(item)
      if (index !== -1) {
        this.selected.splice(index)
        console.log('good')
      } else {
        console.log('bad')
        this.selected.push(item)
      }
      console.log(this.selected)
    }
  }
}
</script>

<style scoped>
.schedule /deep/ .big {
  font-size: 180px !important;
  color: aqua !important;
  background-color: #98d5e4 !important;
}
</style>
