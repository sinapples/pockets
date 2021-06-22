<template>
  <div class="page-wrapper">
    <v-card>
      <ActivityList />

      <v-card-text>
        <v-card-title style="color:black" class="text-center"
          >Do you bring everything?</v-card-title
        >
        <ItemList />
      </v-card-text>
    </v-card>

    <!-- <Checklist /> -->
  </div>
</template>

<script>
// import Checklist from '@/components/Dashboard/PocketView/Checklist'
import ItemList from '@/components/Dashboard/PocketView/ItemList'
import ActivityList from './PocketView/ActivityList.vue'

import { mapState } from 'vuex'

export default {
  components: {
    ItemList,
    ActivityList
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
