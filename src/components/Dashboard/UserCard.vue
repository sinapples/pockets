<template>
  <div class="page-wrapper">
    <v-card>
      <div>
        <v-row>
          <v-col cols="4">
            <v-card-title class="headline">
              {{ titleMessage() }}
            </v-card-title>
          </v-col>
          <v-spacer />
          <v-col>
            <!-- <v-card-title class="headline">
              {{ currentTime }}
            </v-card-title> -->
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline" align="end">
                  Today is
                  <span class=" primary--text text--darken-3">{{
                    dateMessage
                  }}</span>
                </v-list-item-title>
                <v-list-item-title class="headline" color="primary" align="end">
                  The time is
                  <span class=" primary--text text--darken-1">{{
                    currentTime
                  }}</span></v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </div>

      <Weather />
    </v-card>
  </div>
</template>

<script>
import Weather from '@/components/Dashboard/User/WeatherCard'

import { mapState } from 'vuex'
import moment from 'moment'

export default {
  components: { Weather },
  data() {
    return {
      weather: 0,
      moment: moment()
    }
  },

  computed: {
    ...mapState('authentication', ['user']),
    displayName() {
      if (this.user) {
        const index = this.user.displayName.lastIndexOf(' ')

        return this.user.displayName.substring(0, index)
      }
      return ''
    },
    currentTime() {
      return this.moment.format('hh:mm A')
    },
    dateMessage() {
      return `${this.moment.format('dddd, MMMM Do')}`
    }
  },
  mounted() {
    this.timeTicker()
  },
  methods: {
    titleMessage() {
      const hour = this.moment.format('H')
      console.log(`moooooo${hour}`)
      let timeOfDay = 'Moo'
      if (hour >= 6 && hour < 12) timeOfDay = 'Morning'
      else if (hour >= 12 && hour < 18) timeOfDay = 'Afternoon'
      else if (hour >= 18 && hour <= 23) timeOfDay = 'Evening'
      else if (hour >= 0 && hour < 6) timeOfDay = 'Evening'

      return `Good ${timeOfDay}, 
     ${this.user.displayName}
    
     `
    },

    timeTicker() {
      this.moment = moment()

      setTimeout(this.ago, 1000)
    }
  }
}
</script>

<style></style>
