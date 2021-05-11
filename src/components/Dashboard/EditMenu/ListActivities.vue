<template>
  <div>
    <div class="text-center"><h2>Activity List</h2></div>
    <v-chip-group
      v-model="selectedActivity"
      class="px-8"
      mandatory
      show-arrows
      center-active
      active-class="primary--text"
    >
      <v-chip
        v-for="activity in activities"
        :key="activity.id"
        :value="activity"
      >
        {{ activity.name }}
      </v-chip>
    </v-chip-group>

    <v-card class="elevation-0">
      <!-- <v-card-text>
        <div> -->
      <!-- Items -->

      <v-sheet rounded="t-xl" outlined>
        <v-sheet class="primary text-right" dark rounded="t-xl">
          <v-card-title
            >{{ selectedActivity.name }}
            <v-spacer></v-spacer>
            <v-btn icon @click="editMode = !editMode">
              <v-icon v-if="editMode">mdi-check</v-icon>
              <v-icon v-else>mdi-pencil</v-icon>
            </v-btn>
          </v-card-title>
        </v-sheet>

        <div class="pa-4">
          <span class="subheading ">Items to bring</span>
          <v-chip-group active-class="primary--text" column>
            <v-chip
              v-for="tag in selectedActivity.items"
              :key="tag.id"
              :value="tag.name"
              close-icon="mdi-delete"
              :close="editMode"
              @click:close="deleteItem()"
            >
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
          <v-divider class="py-2"></v-divider>
          <div v-if="editMode">
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
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    // Next time move this to vuex

    selectedActivity: {},
    editMode: false,
    itemName: ''
  }),
  computed: {
    ...mapGetters('activities', ['isActivityDeletionPending']),
    ...mapState('activities', ['activities']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: {
    ...mapActions('activities', ['deleteUserActivity', 'updateUserActivity']),
    deleteActivity() {
      console.log('delete')
      const idToDelete = this.selectedActivity.id
      this.selectedActivity = {}
      this.deleteUserActivity(idToDelete)
    },
    deleteItem(item) {
      console.log(`delete Item: ${item}`)
    },
    addItem() {
      // TODO add input validation
      const newItem = {
        name: this.itemName
      }
      console.log(newItem)
      const updateItem = cloneDeep(this.selectedActivity)

      updateItem.items.push(newItem)
      this.updateUserActivity(updateItem)
    }
  }
}
</script>
<style></style>
