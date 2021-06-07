<template>
  <div class="page-wrapper">
    <v-card>
      <v-card-title class="text-center"
        >Good evening {{ displayName }}</v-card-title
      >

      <v-card-text>
        <v-card-title style="color:black" class="text-center"
          >Do you bring everything?</v-card-title
        >
        <Checklist />
      </v-card-text>
    </v-card>
    <v-card>
      <!-- <ActivityList /> -->
    </v-card>
  </div>
</template>

<script>
import Checklist from '@/components/Dashboard/PocketView/Checklist'
// import ActivityList from './PocketView/ActivityList.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Checklist
    // ActivityList
  },
  computed: {
    ...mapState('authentication', ['user']),
    displayName() {
      if (this.user) {
        const index = this.user.displayName.lastIndexOf(' ')

        return this.user.displayName.substring(0, index)
      }
      return ''
    }
  }
}
</script>

<style></style>
