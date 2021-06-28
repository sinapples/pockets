<template>
  <div>
    <v-card class="elevation-2  mt-4">
      <v-card
        color="secondary"
        dark
        outlined
        rounded="t-xl"
        @click="editMode = !editMode"
      >
        <v-card-title>
          <v-icon class="mr-2" color="white">
            mdi-account
          </v-icon>
          Account Information

          <v-spacer />
          <v-btn depressed color="secondary" icon>
            <v-icon class="ml-2" color="white">
              {{ !editMode ? 'mdi-check ' : 'mdi-pencil' }}
            </v-icon>
          </v-btn>
        </v-card-title>
      </v-card>

      <!-- Edit Card -->
      <v-expand-transition>
        <v-card v-show="!editMode" class="elevation-0">
          <v-card-title>Edit Account</v-card-title>
          <v-card-text>
            <v-text-field v-model="newDisplayName" label="Name"></v-text-field>
            <v-text-field
              ref="zipCode"
              v-model="zipCode"
              label="ZIP / Postal Code"
              :rules="[
                () =>
                  zipCode === null ||
                  zipCode === '' ||
                  (!Number.isInteger(zipCode.toString()) &&
                    zipCode.toString().length === 5) ||
                  'Invalid zipCode'
              ]"
              placeholder="79938"
              persistent-hint
              hint="Used for weather data"
            ></v-text-field>
            <v-radio-group v-model="selectedUnit" mandatory row>
              <v-radio label="Imperial" value="imperial"></v-radio>
              <v-radio label="Metric" value="metric"></v-radio>
            </v-radio-group>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :loading="userUpdating"
              :disabled="!isUpdated"
              @click="onSave"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {},
  data: () => ({
    // Next time move this to vuex

    selectedChip: {},
    selectedChips: {},
    editMode: !false,
    showAddActivity: false,
    newDisplayName: '',

    selectedUnit: '',
    zipCode: 0,
    zipRules: [
      v => !Number.isInteger(v) || 'Name is required',
      v =>
        (v && v.toString().length === 5) ||
        'Name must be less than 10 characters'
    ]
  }),

  computed: {
    ...mapGetters('activities', ['isActivityDeletionPending']),
    ...mapState('activities', ['activities', 'selectedEditActivity']),
    ...mapState('authentication', ['user', 'userUpdating']),
    ...mapState('app', ['networkOnLine']),
    isUpdated() {
      return (
        this.newDisplayName !== this.user.displayName ||
        this.selectedUnit !== this.user.units ||
        parseInt(this.zipCode, 10) !== parseInt(this.user.zipCode, 10)
      )
    }
  },

  mounted() {
    this.newDisplayName = this.user.displayName
    this.zipCode = this.user.zipCode ? this.user.zipCode : null
    this.selectedUnit = this.user.units ? this.user.units : 'imperial'
  },

  methods: {
    ...mapMutations('activities', ['setSelectedEditActivity']),
    ...mapActions('authentication', ['deleteUserActivity', 'updateUser']),
    onSave() {
      const updateData = {
        id: this.user.id,
        displayName: this.newDisplayName,
        zipCode: this.zipCode,
        units: this.selectedUnit
      }
      this.updateUser(updateData)
    }
  }
}
</script>
<style></style>
