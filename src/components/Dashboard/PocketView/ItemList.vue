<template>
  <div>
    <v-card>
      <!-- Title -->
      <v-sheet dark color="secondary">
        <v-card-title class="text-center">
          <v-icon class="mr-2"> mdi-clipboard-list-outline</v-icon> Bring these
          today!</v-card-title
        >
      </v-sheet>

      <!-- Toolbar -->
      <v-card-actions>
        <v-btn depressed @click="uncheckAll()">
          <v-icon class="mr-2">mdi-order-bool-ascending-variant </v-icon>
          Uncheck All
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn icon @click="expandColapseAll">
          <v-icon>
            {{ isExpandAll ? 'mdi-collapse-all' : 'mdi-expand-all' }}
          </v-icon>
        </v-btn>
      </v-card-actions>

      <!-- Ready message -->
      <v-sheet v-if="allCheck()" color="primary darken-2">
        <v-card-title dense class="justify-center white--text">
          <v-icon class="mr-2" color="white">mdi-party-popper</v-icon>
          You are ready to go!
          <v-icon class="ml-2" color="white">mdi-party-popper</v-icon>
        </v-card-title>
      </v-sheet>
      <!-- List view -->
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel
          v-for="activity in itemList"
          :key="activity.id"
          dense
          :prepend-icon="activity.icon"
          class="pa-1"
        >
          <v-expansion-panel-header dense ripple color="primary lighten-1">
            <div>
              <v-btn x-small color="secondary" depressed class="mr-2" fab>
                <span v-if="itemsLeft(activity) !== 0">{{
                  itemsLeft(activity)
                }}</span>

                <v-icon v-else>mdi-check</v-icon>
              </v-btn>
              {{ capitalize(activity.name) }}
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="item in activity.items"
                :key="item.name"
                dense
                link
                @click="checkItem(item, activity)"
              >
                <v-list-item-icon>
                  <v-icon>{{
                    isBrought2(item, activity.name)
                      ? 'mdi-checkbox-marked-outline'
                      : 'mdi-checkbox-blank-outline'
                  }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
// import activities from '@/store/activities'
import { mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import { capitalizeWords } from '@/utils/languageUtil'

export default {
  data() {
    return {
      panel: [0],
      selected: [],
      selectedItems: {},
      isExpandAll: true,
      allCheck1: false
    }
  },

  computed: {
    ...mapState('activities', ['activities', 'selectedActivities']),

    ...mapState('app', ['networkOnLine']),

    itemList() {
      const list = []
      list.push(this.alwaysBring)

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
            console.log(` ${JSON.stringify(selected)}`)
            list.push(cloneDeep(selected))
          }
        }
        // list.concat(moo)

        return list
      }
      return list
    },

    alwaysBring() {
      if (this.activities) {
        return cloneDeep(
          this.activities.find(item => {
            return item.name === 'Always Bring'
          })
        )
      }

      return []
    }
  },

  watch: {
    itemList() {
      // console.log('watch moo')
      // this.panel.push(this.itemList.length - 1)
      this.panel = [...Array(this.itemList.length).keys()].map((k, i) => i)
    }
  },
  methods: {
    checkItem(item, activity) {
      // Add the activity if it doesnt exist
      if (!this.selectedItems[activity.name]) {
        this.$set(this.selectedItems, activity.name, {})
        this.$set(this.selectedItems[activity.name], 'list', [])
        // this.selectedItems[activity] = {}
        // this.selectedItems[activity].list = []
      }
      // Check if activity exisit

      const index = this.selectedItems[activity.name].list.indexOf(item.name)
      if (index !== -1) {
        this.selectedItems[activity.name].list.splice(index, 1)
        console.log(`good${activity.name}`)
      } else {
        console.log('bad')
        this.selectedItems[activity.name].list.push(item.name)
      }
      console.log(this.selectedItems)

      // Colpase pannel

      if (this.itemList.length >= 0 && this.itemsLeft(activity) === 0) {
        console.log('coplaseess')
        const panelIndex = this.panel.indexOf(this.itemList.indexOf(activity))
        this.panel.splice(panelIndex, 1)
      }

      // check if every is cehcked
    },

    isBrought2({ name }, activityName) {
      // console.log(`>>>${name}`)

      if (this.selectedItems[activityName]) {
        return this.selectedItems[activityName].list.indexOf(name) !== -1
      }
      return false
    },

    rowClick(item) {
      const index = this.selected.indexOf(item.name)
      if (index !== -1) {
        this.selected.splice(index, 1)
        console.log('good')
      } else {
        console.log('bad')
        this.selected.push(item.name)
      }
      console.log(this.selected)
    },

    isBrought({ name }) {
      // console.log(`>>>${name}`)
      return this.selected.indexOf(name) !== -1
    },

    itemsLeft(activity) {
      if (this.selectedItems[activity.name]) {
        return (
          activity.items.length - this.selectedItems[activity.name].list.length
        )
      }

      if (activity.items) {
        return activity.items.length
      }
      return 100
    },
    expandColapseAll() {
      if (this.isExpandAll) {
        this.panel = []
      } else {
        this.panel = [...Array(this.itemList.length).keys()].map((k, i) => i)
      }
      this.isExpandAll = !this.isExpandAll
    },
    uncheckAll() {
      this.selectedItems = {}
      this.panel = [...Array(this.itemList.length).keys()].map((k, i) => i)
    },
    allCheck() {
      let bool = true
      // for (let i = 0; i < this.itemList.length; i = +1) {
      // if (this.itemsLeft(this.itemList[i]) !== 0) {

      if (this.itemList.length >= 0) {
        // bool = false
        // return false
      }

      this.itemList.forEach(activity => {
        if (this.itemsLeft(activity) !== 0) {
          bool = false
        }
      })

      // }
      // }

      this.allCheck1 = bool
      return bool
    },
    capitalize(item) {
      return capitalizeWords(item)
    }
  }
}
</script>

<style></style>
