<template>
  <div>
    <div class="text-center">
      <h2>Activity List</h2>
    </div>

    <v-chip-group
      v-model="selectedChip"
      class="px-8"
      mandatory
      show-arrows
      center-active
      active-class="primary--text"
    >
      <v-chip
        v-for="activity in activities"
        :key="activity.id"
        :input-value="selectedChip"
        :value="activity"
        @click="setSelectedEditActivityMoo(activity)"
      >
        {{ activity.name }}
      </v-chip>
    </v-chip-group>

    <!-- <div>
      {{ 'moo:' + JSON.stringify(selectedEditActivity) }}
    </div> -->

    <!-- Edit Card -->
    <v-card class="elevation-0">
      <v-sheet rounded="t-xl" outlined>
        <v-sheet class="primary text-right" dark rounded="t-xl">
          <v-card-title
            >{{ selectedEditActivity.name }}
            <v-spacer></v-spacer>
            <v-btn icon @click="editMode = !editMode">
              <v-icon v-if="editMode">mdi-check</v-icon>
              <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
          </v-card-title>
        </v-sheet>

        <div class="pa-4">
          <span v-if="selectedEditActivity.items.length > 0" class="subheading"
            >Items to bring</span
          ><span v-else class="subheading">Item list empty</span>

          <v-chip-group active-class="primary--text" column>
            <v-chip
              v-for="tag in selectedEditActivity.items"
              :key="tag.id"
              :value="tag.name"
              close-icon="mdi-delete"
              :close="editMode"
              @click:close="deleteItem(tag)"
            >
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
          <v-divider class="py-2"></v-divider>
          <div v-if="editMode || selectedEditActivity.items.length === 0">
            <v-row>
              <v-col>
                <v-text-field
                  v-model="itemName"
                  dense
                  label="New Item"
                ></v-text-field>
              </v-col>
              <v-spacer />
              <v-col>
                <v-btn small @click="addItem">
                  <v-icon small>mdi-plus</v-icon> Add
                </v-btn>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-btn color="error" small @click="deleteActivity"
                ><v-icon>mdi-trash</v-icon>Delete Activity</v-btn
              >
              <v-spacer></v-spacer>
              <v-btn color="primary" small @click="editMode = !editMode"
                >Done</v-btn
              >
            </v-card-actions>
          </div>
        </div>
      </v-sheet>

      <!-- End of items -->
      <!-- </div>
      </v-card-text> -->
    </v-card>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    // Next time move this to vuex

    selectedChip: {},
    selectedChips: {},
    editMode: false,
    itemName: ''
  }),

  computed: {
    ...mapGetters('activities', ['isActivityDeletionPending']),
    ...mapState('activities', ['activities', 'selectedEditActivity']),
    ...mapState('app', ['networkOnLine'])
  },
  watch: {
    selectedEditActivity(newItem) {
      const index = this.activities.findIndex(
        element => element.name === newItem.name
      )

      // eslint-disable-next-line prefer-destructuring
      this.selectedChip = this.activities[index]
    }
  },
  methods: {
    ...mapMutations('activities', ['setSelectedEditActivity']),
    ...mapActions('activities', ['deleteUserActivity', 'updateUserActivity']),
    deleteActivity() {
      if (this.selectedEditActivity.name === 'Always Bring') {
        console.log('Cannot delete this')
      } else {
        console.log('delete')
        const idToDelete = this.selectedEditActivity.id

        this.deleteUserActivity(idToDelete)
      }
    },
    setSelectedEditActivityMoo(item) {
      console.log(`moo${item}`)
      this.setSelectedEditActivity(item)
    },
    deleteItem(item) {
      console.log(`delete Item: ${item}`)
      const updateItem = cloneDeep(this.selectedEditActivity)
      const index = updateItem.items.findIndex(
        element => element.name === item.name
      )
      updateItem.items.splice(index, 1)
      this.updateUserActivity(updateItem)
    },
    addItem() {
      // TODO add input validation
      const newItem = {
        name: this.itemName
      }
      console.log(newItem)
      const updateItem = cloneDeep(this.selectedEditActivity)

      updateItem.items.push(newItem)
      this.updateUserActivity(updateItem)
    }
  }
}
</script>
<style></style>
