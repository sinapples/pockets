<template>
  <div>
    <v-card-text class="pt-0">
      <!-- Current Weather -->
      <div class="text-h4 font-weight-light mb-2">
        {{ city }}
      </div>
      <div class="text-h2 font-weight-light grey--text">
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
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>
        mdi-clock
      </v-icon>
      <span class="text-caption grey--text font-weight-light"
        >Last weather update {{ lastWeatherMgs }}
      </span>

      <!-- <v-sheet
        class="v-sheet--offset mx-auto"
        color="cyan"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <v-sparkline
          :labels="hourLabels"
          :value="hourWeather"
          show-labels
          color="white"
          line-width="2"
          padding="16"
        ></v-sparkline>
      </v-sheet> -->
    </v-card-text>
    <HourlyWeather :weather-data="hourlyData" :units="user.units" />
    <!-- End of card -->
  </div>
</template>

<script>
// import Checklist from '@/components/Dashboard/PocketView/Checklist'
import HourlyWeather from '@/components/Dashboard/User/HourlyWeather'

import { mapState } from 'vuex'
import axios from 'axios'
import moment from 'moment'

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]
export default {
  components: { HourlyWeather },
  data() {
    return {
      weather: 0,
      forecast: null,
      allData: null,
      zipCode: 0,

      lastWeatherCheck: new Date(),
      lastWeatherMgs: '',
      // line
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
      value: [200, 675, 410, 390, 310, 460, 250, 240],
      gradientDirection: 'top',
      labels: ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'],
      gradients,
      fill: false,
      type: 'bar',

      autoLineWidth: false
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
        const temps = this.forecast.list.slice(0, 6).map(jsonObject => {
          return moment(jsonObject.dt_txt).format('LT')
          // return jsonObject.dt_text
        })

        console.log('tmps')
        console.log(temps)
        return temps
      }
      return [12, 34, 45]
      // return this.weather ? Math.round(this.weather.main.temp) : ''
    },
    hourlyData() {
      if (this.forecast) {
        return this.forecast.list.slice(0, 6)
      }
      return []
      // return this.weather ? Math.round(this.weather.main.temp) : ''
    },
    hourWeather() {
      if (this.forecast) {
        const temps = this.forecast.list.slice(0, 6).map(jsonObject => {
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
    this.weatherTicker()
    this.timeTicker()
  },
  methods: {
    format(item) {
      return moment(item).format('LLL')
    },
    async getWeather() {
      if (this.user.zipCode === undefined || this.user.zipCode === null) {
        this.zipCode = 20853
      } else {
        this.zipCode = this.user.zipCode
      }
      //   const city = 20853

      const apiKeys = [
        'aa424f9dbca59def4e1f2581126381c6',
        '74b11479b916f532948403e5b2c5a79e'
      ]
      apiKeys.forEach(async i => {
        const apiKey = i

        try {
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
          this.getlastWeatherTime()
          return
        } catch (e) {
          console.log(`Weather Error${e}`)
        }
      })
    },

    weatherTicker() {
      this.moment = moment()
      const minutesToRefesh = 30
      const oneMinuteInMs = 60000
      const timeToFetch = minutesToRefesh * oneMinuteInMs

      setInterval(() => {
        this.getWeather()

        this.lastWeatherCheck = new Date()
      }, timeToFetch)

      // 60000 0
    },
    timeTicker() {
      this.moment = moment()
      const twoMinutes = 120000
      setInterval(() => {
        this.getlastWeatherTime()
      }, twoMinutes)
    },
    getlastWeatherTime() {
      console.log(`last wather${this.lastWeatherCheck.getTime()}`)
      // console.log(moment(this.lastWeatherCheck.getTime()).fromNow())
      this.lastWeatherMgs = moment(this.lastWeatherCheck.getTime()).fromNow()
    }
  }
}
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
