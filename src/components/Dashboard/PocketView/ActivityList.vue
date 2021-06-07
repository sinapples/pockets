<template>
  <v-card class="mt-4">
    <v-card-title class="text-center">
      Where are you going today?
    </v-card-title>

    <v-card-text>
      <v-row class="p-1">
        <span
          v-for="activity in activities"
          :key="activity.id"
          :value="activity"
        >
          <v-col class="pa-1">
            <v-card
              rounded="xl"
              :hover="true"
              width="180px"
              height="100px"
              :color="activity.color"
              @click="onClick(activity)"
            >
              <v-card-title class="pb-0">
                <v-spacer></v-spacer><v-icon small>{{ icon(activity) }}</v-icon>
              </v-card-title>
              <v-card-text class="name">{{ activity.name }}</v-card-text>
            </v-card>
          </v-col>
        </span>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// import activities from '@/store/activities'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('activities', ['isActivityDeletionPending']),
    ...mapState('activities', ['activities', 'selectedActivities']),
    ...mapState('app', ['networkOnLine']),
    itemList() {
      if (this.activities) {
        const index = this.activities.findIndex(
          element => element.name === 'Always Bring'
        )
        console.log(index)
        return this.activities[index].items
      }
      return []
    }
  },
  methods: {
    ...mapMutations('activities', [
      'setSelectedEditActivity',
      'addRemoveSelectedActivity'
    ]),

    icon(item) {
      return this.selectedActivities.findIndex(id => id === item.id) === -1
        ? 'mdi-checkbox-blank-circle-outline'
        : 'mdi-check-circle-outline'
    },
    onClick(item) {
      // this.icon = this.elevation
      //   ? 'mdi-check-circle-outline'
      //   : 'mdi-checkbox-blank-circle-outline'
      console.log(item.id)
      this.addRemoveSelectedActivity(item.id)
    },
    clearList() {
      this.selected = []
    },

    getColor() {
      return 'blue'
    }
  }
}
</script>

<style scoped>
.titleMessage {
  font-size: 24px;
  color: black;
}
.subtitleMessage {
  font-size: 20px;
  color: black;
}
.subtitle {
  font-size: 20px;
  color: black;
}

.name {
  /* padding-left:30% ; */
  /* padding-bottom:16% ; */
  /* padding-top:0px ; */
  text-align: center;
  word-wrap: normal;
  overflow-wrap: normal;
  font-size: 20px;
  color: white !important;
}

.bigButton {
  /* padding: 50px !important; */
  /* padding-top: 60px !important; */
  /* padding-bottom: 20px !important; */
  /* margin: 1px; */
}
</style>
