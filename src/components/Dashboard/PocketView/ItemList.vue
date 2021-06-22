<template>
  <div>
    <!-- {{ alwaysBring }} -->
    <!-- <span v-if="haveEverything"> You are ready to go </span> -->

    <v-card>
      <v-sheet dark color="secondary">
        <v-card-title class="text-center"
          >This is what you need today</v-card-title
        >
      </v-sheet>

      <v-card-actions>
        <v-btn depressed @click="selected = []">
          Reset List
        </v-btn>
        <v-spacer></v-spacer>

        <!-- <v-btn @click="all">
          all
        </v-btn> -->
        <v-btn icon @click="expandColapseAll">
          <v-icon>
            {{ isExpandAll ? 'mdi-collapse-all' : 'mdi-expand-all' }}
          </v-icon>
        </v-btn>
        <!-- 
        <v-btn @click="none">
          none
        </v-btn> -->
      </v-card-actions>

      <v-expansion-panels v-model="panel" multiple
        ><v-expansion-panel
          v-for="activity in itemList"
          :key="activity.id"
          dense
          :prepend-icon="activity.icon"
          class="pa-1"
        >
          <v-expansion-panel-header dense v-text="activity.name">
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="item in activity.items"
                :key="item.name"
                dense
                link
                @click="rowClick(item)"
              >
                <v-list-item-icon>
                  <v-icon>{{
                    isBrought(item)
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
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import { cloneDeep } from 'lodash'

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
      panel: [0],
      selected: [],
      isExpandAll: true
    }
  },

  watch: {
    itemList() {
      console.log('watch moo')

      this.panel = [...Array(this.itemList.length).keys()].map((k, i) => i)
    }
  },
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
      const list = []
      list.push(this.alwaysBring)
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
            console.log(` ${JSON.stringify(selected)}`)
            list.push(cloneDeep(selected))
          }
        }
        // list.concat(moo)
        console.log(list[1])
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
  methods: {
    ...mapMutations('activities', ['setSelectedEditActivity']),
    ...mapActions('activities', ['deleteUserActivity', 'updateUserActivity']),
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
      console.log(`>>>${name}`)
      return this.selected.indexOf(name) !== -1
    },
    expandColapseAll() {
      if (this.isExpandAll) {
        this.panel = []
      } else {
        this.panel = [...Array(this.itemList.length).keys()].map((k, i) => i)
      }
      this.isExpandAll = !this.isExpandAll
    }
  }
}
</script>

<style></style>
