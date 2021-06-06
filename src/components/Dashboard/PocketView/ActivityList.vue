<template>
  <v-card class="mt-4">
    <v-card-title class="text-center">
      Activity List
    </v-card-title>
    <v-card-text>
      <v-row class="p-1">
        <span
          v-for="activity in activities"
          :key="activity.id"
          class="bigButton"
          :value="activity"
        >
          <v-col class="pa-1">
            <v-card
              rounded="xl"
              class="bigButton"
              :hover="true"
              max-width="200px"
              max-height="200px"
              :color="activity.color"
              @click="onClick"
            >
              <v-card-title>
                <v-card-text class="name">{{ activity.name }}</v-card-text>
              </v-card-title>
            </v-card>
          </v-col>
        </span>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// import activities from '@/store/activities'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters('activities', ['isActivityDeletionPending']),
    ...mapState('activities', ['activities', 'selectedEditActivity']),
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
    ...mapMutations('activities', ['setSelectedEditActivity']),
    ...mapActions('activities', ['deleteUserActivity', 'updateUserActivity']),

    openEdit() {
      alert('edit menu')
    },
    onClick() {
      this.icon = this.elevation
        ? 'mdi-check-circle-outline'
        : 'mdi-checkbox-blank-circle-outline'
      this.elevation = !this.depressed ? 20 : 0
      this.depressed = !this.depressed
      this.outlined = !this.outlined
      this.$emit('emitLocationSelected', this.name)
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

  font-size: 20px;
  color: white !important;
}

.bigButton {
  /* padding: 50px !important; */
  /* padding-top: 60px !important; */
  padding-bottom: 20px !important;
  /* margin: 1px; */
}
</style>
