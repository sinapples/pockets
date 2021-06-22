<template>
  <div class="page-wrapper">
    <v-card>
      <div>
        <v-row>
          <v-col xl="4" lg="4" md="4" sm="7" xs="7">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline" align="start">
                  <span class=" black--text text--darken-3">{{
                    titleMessage()
                  }}</span>
                </v-list-item-title>
                <v-list-item-title class="headline" align="start">
                  <span class=" primary--text text--darken-4">{{
                    ' ' + user.displayName
                  }}</span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <!-- <div class="headline">
              <span>
                {{ titleMessage() }}
              </span>
              <span>
                {{ ' ' + user.displayName }}
              </span>
            </div>
           -->

          <v-col xl="4" lg="4" md="4" sm="5" xs="5">
            <!-- <v-card-title class="headline">
              {{ currentTime }}
            </v-card-title> -->
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline" align="end">
                  <span class=" primary--text text--darken-3">{{
                    dayMessage
                  }}</span>
                </v-list-item-title>
                <v-list-item-title class="headline" align="end">
                  <span class=" primary--text text--darken-3">{{
                    dateMessage
                  }}</span>
                </v-list-item-title>
                <v-list-item-title class="headline" color="primary" align="end">
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
    dayMessage() {
      return `${this.moment.format('dddd')}`
    },
    dateMessage() {
      return `${this.moment.format('MMMM Do')}`
    }
  },
  mounted() {
    this.timeTicker()
  },
  methods: {
    titleMessage() {
      const hour = this.moment.format('H')
      // console.log(`moooooo${hour}`)
      let timeOfDay = 'Moo'
      if (hour >= 6 && hour < 12) timeOfDay = 'Morning'
      else if (hour >= 12 && hour < 18) timeOfDay = 'Afternoon'
      else if (hour >= 18 && hour <= 23) timeOfDay = 'Evening'
      else if (hour >= 0 && hour < 6) timeOfDay = 'Evening'

      return `Good ${timeOfDay},`
    },

    timeTicker() {
      this.moment = moment()
      const oneMinutes = 60000
      setTimeout(this.timeTicker, oneMinutes)
    }
  }
}
</script>

<style></style>
