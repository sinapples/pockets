<template>
  <div>
    <!-- Acitivity Card -->
    <v-card class="elevation-2  mt-4">
      <v-sheet color="primary" outlined rounded="t-xl">
        <!-- Activitiy List Heading -->
        <v-card-title>Edit Activity List </v-card-title>
      </v-sheet>
      <!-- Activity Chips  -->
      <v-card-text>
        <div class="mx-4">
          <v-chip-group
            v-model="selectedChip"
            mandatory
            column
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
          <!-- Add activity  -->
          <v-divider class="my-4"></v-divider>
          <div>
            <AddActivity />
          </div>
        </div>
      </v-card-text>
      <!-- Edit Activity  -->
      <v-card class="elevation-0">
        <v-sheet rounded="t-xl" outlined>
          <v-sheet class="primary text-right">
            <!-- Activity Heading -->
            <v-card-title
              >{{ selectedEditActivity.name }}
              <v-spacer></v-spacer>
              <v-btn icon @click="editMode = !editMode">
                <v-icon v-if="editMode">mdi-check</v-icon>
                <v-icon v-else>mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
          </v-sheet>
          <!-- Item List Label -->
          <div class="pa-4">
            <span v-if="hasItems" class="subheading">Current Items</span
            ><span v-else class="subheading">Add Items</span>
            <!-- Item List -->
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
            <v-divider class="my-4"></v-divider>
            <!-- Add items  -->
            <div>
              <v-row>
                <v-col cols="7">
                  <v-text-field
                    v-model="itemName"
                    dense
                    outlined
                    label="Add Item"
                    placeholder="Item Name"
                  ></v-text-field>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-btn color="primary darken-1" @click="addItem">
                    <v-icon>mdi-plus</v-icon> Add
                  </v-btn>
                </v-col>
              </v-row>
              <v-card-actions v-if="editMode">
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
    </v-card>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

import AddActivity from '@/components/Dashboard/EditMenu/AddActivity'

export default {
  components: { AddActivity },
  data: () => ({
    // Next time move this to vuex

    selectedChip: {},
    selectedChips: {},
    editMode: false,
    showAddActivity: false,
    itemName: ''
  }),

  computed: {
    ...mapGetters('activities', ['isActivityDeletionPending']),
    ...mapState('activities', ['activities', 'selectedEditActivity']),

    ...mapState('app', ['networkOnLine']),
    hasItems() {
      return this.selectedEditActivity.items !== undefined
        ? this.selectedEditActivity.items.length > 0
        : false
    }
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
      console.log('Add item click')
      console.log(this.selectedEditActivity)
      const updateItem = cloneDeep(this.selectedEditActivity)

      updateItem.items.push(newItem)
      this.updateUserActivity(updateItem)
      this.itemName = ''
    }
  }
}
</script>
<style></style>
