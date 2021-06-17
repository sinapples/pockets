<template>
  <div class="page-wrapper">
    <v-card>
      <v-card-title class="text-center"
        >Good evening {{ displayName }}</v-card-title
      >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            Rockville
          </v-list-item-title>
          <v-list-item-subtitle
            >Mon, 12:30 PM, Mostly Hardcoded</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="text-h2" cols="6">
            23&deg;C
          </v-col>
          <v-col cols="6">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sun.png"
              alt="Sunny image"
              width="92"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card>
      <ActivityList />
    </v-card>
    <v-card>
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
