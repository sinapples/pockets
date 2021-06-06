<template>
  <div class="page-wrapper">
    <v-card>
      <v-card-title class="text-center">Good evening </v-card-title>

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

export default {
  components: {
    Checklist
    // ActivityList
  }
}
</script>

<style></style>
