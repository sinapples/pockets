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
          <span class="black--text">Your Activities </span>
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
                    show
                    outlined
                    :error="isError(itemName)"
                    :error-messages="errorMsg(itemName)"
                    label="Add Item"
                    placeholder="Item Name"
                    @keydown.enter="addItem"
                  ></v-text-field>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-btn
                    color="primary darken-2"
                    :disabled="isError(itemName)"
                    @click="addItem"
                  >
                    <v-icon>mdi-plus</v-icon> Add
                  </v-btn>
                </v-col>
              </v-row>

              <!-- Advance edit -->

              <v-expand-transition>
                <div v-show="editMode">
                  <v-card-actions>
                    <!-- Confrim Delete Button -->
                    <v-expand-transition v-if="confirmDelete">
                      <span v-show="confirmDelete">
                        <v-row no-gutters>
                          <v-col cols="12">
                            <span>
                              Delete {{ selectedEditActivity.name }}?
                            </span>
                          </v-col>

                          <v-col>
                            <v-btn
                              color="error"
                              class="mr-2"
                              small
                              @click="deleteActivity"
                            >
                              Yes</v-btn
                            >
                            <v-btn
                              color="secondary"
                              class="mr-2"
                              small
                              @click="confirmDelete = !confirmDelete"
                            >
                              No</v-btn
                            >
                          </v-col>
                        </v-row>
                      </span>
                    </v-expand-transition>
                    <!-- Delete? button -->
                    <v-expand-transition v-else>
                      <span>
                        <v-row no-gutters>
                          <v-col cols="12">
                            <v-btn
                              color="error"
                              small
                              @click="confirmDelete = !confirmDelete"
                              ><v-icon>mdi-trash</v-icon>Delete Activity</v-btn
                            >
                          </v-col>
                        </v-row>
                      </span>
                    </v-expand-transition>

                    <!-- Save button -->
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="editMode = !editMode"
                      >Update</v-btn
                    >
                  </v-card-actions>
                </div>
              </v-expand-transition>
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
import { mapState, mapActions, mapMutations } from 'vuex'

import AddActivity from '@/components/Dashboard/EditMenu/AddActivity'
import { capitalize } from '@/utils/languageUtil'

export default {
  components: { AddActivity },
  data: () => ({
    selectedChip: {},
    confirmDelete: false,
    editMode: false,
    itemRules: [v => !!v || 'Item Already Exist'],
    itemName: ''
  }),

  computed: {
    ...mapState('activities', ['activities', 'selectedEditActivity']),

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

    isVaildNewItem(v) {
      if (v) {
        const duplicates = this.selectedEditActivity.items.find(item => {
          return item.name.toLowerCase() === v.toLowerCase()
        })
        console.log(duplicates)
        if (duplicates) {
          return false
        }
        return true
      }
      console.log(v)
      return true
    },
    addItem() {
      if (this.isError(this.itemName.trim())) {
        return
      }

      if (this.itemName.trim()) {
        const newItem = {
          name: capitalize(this.itemName.trim())
        }
        console.log('Add item click')
        console.log(this.selectedEditActivity)
        const updateItem = cloneDeep(this.selectedEditActivity)

        updateItem.items.push(newItem)
        this.updateUserActivity(updateItem)
        this.itemName = ''
      }
    },

    errorMsg(item) {
      return this.isError(item) ? 'Item already exist' : ''
    },
    isError(item) {
      if (item) {
        const duplicates = this.selectedEditActivity.items.find(element => {
          return element.name.trim().toLowerCase() === item.trim().toLowerCase()
        })
        console.log(duplicates)
        if (duplicates) {
          return true
        }
        return false
      }

      return false
    }
  }
}
</script>
<style></style>
