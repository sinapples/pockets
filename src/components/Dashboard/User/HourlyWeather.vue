<template>
  <div>
    <!-- {{ weatherData }} -->
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Hourly Weather</v-expansion-panel-header>
        <v-expansion-panel-content class="pl-0">
          <v-row>
            <v-col>
              <!-- Timeline -->
              <v-timeline
                v-for="item in weatherData"
                :key="item.dt"
                align="start"
                class="pl-0"
              >
                <v-timeline-item
                  :icon="getIcon(item)"
                  :color="getTempColor(item)"
                >
                  <v-card :color="getTempColor(item)" dense dark>
                    <v-card-title class="text-body-1 py-1">
                      {{ format(item.dt_txt) }}
                    </v-card-title>
                    <v-card-text class="white text--primary">
                      <div>{{ item.weather[0].main }}</div>

                      {{ Math.round(item.main.temp) }}&deg;{{
                        units == 'metric' ? 'C' : 'F'
                      }}
                    </v-card-text>
                  </v-card>
                  <!-- <div>
                    {{ format(item.dt_txt) }}
                  </div>
                  <div>
                    {{ Math.round(item.main.temp) }}&deg;{{
                      units == 'metric' ? 'C' : 'F'
                    }}
                  </div> -->
                </v-timeline-item>
              </v-timeline>
            </v-col>
            <v-spacer />
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
// import Checklist from '@/components/Dashboard/PocketView/Checklist'
// import HourlyWeather from '@/components/Dashboard/User/HourlyWeather'

import moment from 'moment'

export default {
  components: {},
  props: {
    weatherData: Array,
    units: String
  },
  data() {
    return {}
  },
  computed: {
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

      this.getWeather()
    }
  },
  mounted() {},
  methods: {
    format(item) {
      return moment(item).format('LT')
    },

    getTempColor(item) {
      const temp = item.main.feels_like
      if (
        (temp > 90 && this.units !== 'metric') ||
        (this.units === 'metric' && temp > 32)
      ) {
        return 'red lighten-2'
      }
      if (
        (temp >= 80 && temp <= 90 && this.units !== 'metric') ||
        (temp >= 26 && temp <= 32 && this.units === 'metric')
      ) {
        console.log('green')
        return 'orange lighten-2'
      }
      if (
        (temp >= 70 && temp <= 80 && this.units !== 'metric') ||
        (temp >= 21 && temp <= 26 && this.units === 'metric')
      ) {
        console.log('blue')
        return 'green lighten-2'
      }
      if (
        (temp >= 60 && temp <= 70 && this.units !== 'metric') ||
        (temp >= 15 && temp <= 21 && this.units === 'metric')
      ) {
        return 'blue lighten-2'
      }

      if (
        (temp >= 50 && temp <= 60 && this.units !== 'metric') ||
        (temp >= 10 && temp <= 15 && this.units === 'metric')
      ) {
        return 'blue lighten-2'
      }
      if (
        (temp < 50 && this.units !== 'metric') ||
        (temp >= 10 && this.units === 'metric')
      ) {
        return 'purple lighten-2'
      }
      return 'gray lighten-2'
    },
    getIcon(weather) {
      switch (weather.weather[0].main) {
        case 'Rain':
          return 'mdi-weather-rainy'
        case 'Clouds':
          return 'mdi-weather-cloudy'
        case 'Clear':
          return 'mdi-weather-sunny'
        case 'Sunny':
          return 'mdi-weather-sunny'
        case 'Snow':
          return 'mdi-weather-snowy'

        default:
          return 'mdi-google'
      }
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
