<template>
  <div class="page-wrapper">
    <v-card>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            {{ city }}
          </v-list-item-title>
          <v-list-item-subtitle>Currently</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <!-- Current Temp -->
        <v-row align="center">
          <v-col class="text-h2" cols="6">
            {{ currentTemp }}&deg;{{ user.units == 'metric' ? 'C' : 'F' }}
          </v-col>
          <v-col cols="6">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sun.png"
              alt="Sunny image"
              width="92"
            ></v-img>
          </v-col>
        </v-row>

        <!-- Hourly -->
        <v-slider
          :max="6"
          :tick-labels="hourLabels"
          class="mx-4 mt-8"
          :thumb-size="40"
          thumb-label="always"
          ticks
        >
          <template v-slot:thumb-label="{ value }">
            {{ hourWeather[value] }}
          </template>
        </v-slider>
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
import moment from 'moment'

export default {
  components: {},
  data() {
    return {
      weather: 0,
      forecast: null,
      allData: null,
      zipCode: 0
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
    city() {
      return this.forecast ? this.forecast.city.name : ''
    },
    currentTemp() {
      return this.weather ? Math.round(this.weather.main.temp) : ''
    },
    hourLabels() {
      if (this.forecast) {
        const temps = this.forecast.list.map(jsonObject => {
          return moment(jsonObject.dt).format('hh:mm')
        })

        console.log('tmps')
        console.log(temps)
        return temps
      }
      return [12, 34, 45]
      // return this.weather ? Math.round(this.weather.main.temp) : ''
    },
    hourWeather() {
      if (this.forecast) {
        const temps = this.forecast.list.map(jsonObject => {
          return Math.round(jsonObject.main.temp)
        })

        console.log('tmps')
        console.log(temps)
        return temps
      }
      return [12, 34, 45]
      // return this.weather ? Math.round(this.weather.main.temp) : ''
    }
  },

  watch: {
    user() {
      console.log('User updated')
      this.zipCode = this.user.zipCode
      this.getWeather()
    }
  },
  mounted() {
    if (this.user.zipCode !== undefined || this.user.zipCode !== null) {
      this.zipCode = this.user.zipCode
    } else {
      this.zipCode = 20853
    }
    // this.getWeather()
    this.getWeather()
  },
  methods: {
    async getWeather() {
      if (this.user.zipCode === undefined || this.user.zipCode === null) {
        this.zipCode = 20853
      } else {
        this.zipCode = this.user.zipCode
      }
      //   const city = 20853
      const apiKey = 'aa424f9dbca59def4e1f2581126381c6'

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${
        this.zipCode
      },us&appid=${apiKey}&units=${this.user.units}`
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${
        this.zipCode
      },us&appid=${apiKey}&units=${this.user.units}`

      const weather = await axios.get(weatherUrl)
      const forecast = await axios.get(forecastUrl)
      const allInfo = `https://api.openweathermap.org/data/2.5/onecall?lat=${
        forecast.data.city.coord.lat
      }&lon=${forecast.data.city.coord.lon}&appid=${apiKey}`
      const allData = await axios.get(allInfo)

      console.log({ forecast: forecast.data, weather: weather.data })
      this.allData = allData.data
      this.forecast = forecast.data
      this.weather = weather.data
    }
  }
}
</script>

<style></style>
