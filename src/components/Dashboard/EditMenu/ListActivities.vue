<template>
  <div>
    <div class="text-center"><h2>Activity List</h2></div>
    <v-chip-group
      v-model="selectedActivity"
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
      <v-card-title>{{ selectedActivity.name }} </v-card-title>
      <v-card-text>
        {{ selectedActivity.id }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="deleteActivity"
          ><v-icon>mdi-trash</v-icon>Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    selectedActivity: {}
  }),
  computed: {
    ...mapGetters('activities', ['isActivityDeletionPending']),
    ...mapState('activities', ['activities']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: {
    ...mapActions('activities', ['deleteUserActivity']),
    deleteActivity() {
      console.log('delete')
      this.deleteUserActivity(this.selectedActivity.id)
    }
  }
}
</script>
<style></style>
