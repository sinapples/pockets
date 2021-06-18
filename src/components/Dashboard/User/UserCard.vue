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
          <v-col class="text-h2" cols="6"> {{ weather }}&deg;F </v-col>
          <v-col cols="6">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sun.png"
              alt="Sunny image"
              width="92"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="getWeather"> Weather</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// import Checklist from '@/components/Dashboard/PocketView/Checklist'

import { mapState } from 'vuex'
import axios from 'axios'

export default {
  components: {},
  data() {
    return {
      weather: 0
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
    }
  },
  mounted() {
    this.getWeather()
  },
  methods: {
    async getWeather() {
      //   const city = 20853
      const apiKey = 'aa424f9dbca59def4e1f2581126381c6'
      //   const url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=${city}`
      const forecastUrl = `https://api.openweathermap.org/data/2.5/weather?zip=20853,us&appid=${apiKey}&units=imperial`

      //   const moo = await axios.get(url)
      const weather = await axios.get(forecastUrl)
      //   console.log(moo)
      console.log(weather.data.main)
      this.weather = weather.data.main.temp
      //   return this.weather
    }
  }
}
</script>

<style></style>
