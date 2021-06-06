<template>
  <!-- <div class="page-wrapper"> -->
  <div>
    <v-parallax
      src="https://images.unsplash.com/photo-1571126770037-2945244eea9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"
    >
      <div class="page-wrapper">
        <v-card color="primary" rounded="xl">
          <v-card-title>
            <h1>
              Welcome to Pockets
            </h1>
          </v-card-title>
        </v-card>
        <br />
        <v-icon color="black" fab>mdi-chevron-double-down</v-icon>
      </div>
    </v-parallax>
    <v-container class="text-center my-8">
      <h2 class="display-2 font-weight-bold mb-3">
        Wallet, Phone, Keys, Mask
      </h2>

      <v-responsive class="mx-auto mb-8" width="56">
        <v-divider class="mb-1"></v-divider>

        <v-divider></v-divider>
      </v-responsive>

      <v-responsive
        class="mx-auto title font-weight-light mb-8"
        max-width="720"
      >
        Pockets is your dashboard before going out. Going to work? Pockets will
        remind you to bring your laptop and badge. Don't forget to bring our
        water bottle when going to the gym. Is it cold outside? Pockets can
        suggest what to where and even tell you to bring an umbrella!
      </v-responsive>

      <div></div>

      <v-btn color="grey" href="#/login" outlined large>
        <span class="grey--text text--darken-1 font-weight-bold">
          Get Started
        </span>
      </v-btn>
    </v-container>
    <v-parallax
      src="https://images.unsplash.com/photo-1544890023-22d480ec4862?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
    >
      <div class="page-wrapper">
        <v-card color="primary" rounded="xl">
          <v-card-title class="text-center">
            <h1>Hey Google, <br />Tell Pockets I'm going to work</h1>
          </v-card-title>
        </v-card>
        <br />
        <v-icon color="black">mdi-chevron-double-down</v-icon>
      </div>
    </v-parallax>
    <v-container class="text-center my-8">
      <h2 class="display-2 font-weight-bold mb-3">
        Hands free reminders!
      </h2>

      <v-responsive class="mx-auto mb-8" width="56">
        <v-divider class="mb-1"></v-divider>

        <v-divider></v-divider>
      </v-responsive>

      <v-responsive
        class="mx-auto title font-weight-light mb-8"
        max-width="720"
      >
        Use your voice to ask your smart assisant to remind you want you need to
        bring. Get reminders right at the door
      </v-responsive>

      <div></div>

      <v-btn
        href="https://www.amazon.com/Sinapples-Super-Effective/dp/B08YRCS2LK"
        target="_blank"
        class="mr-2 noCap"
        color="white"
      >
        <v-icon class="mr-2" color="blue lighten-2">mdi-amazon-alexa</v-icon>
        Alexa</v-btn
      >
      <v-btn
        href="https://assistant.google.com/services/invoke/uid/00000016d8836bb4?hl=en"
        target="_blank"
        color="white"
        class="mr-2 noCap"
      >
        <!-- <v-icon class="mr-2">mdi-google-assistant</v-icon> -->
        <v-img
          contain="true"
          class="mr-2"
          max-height="24px"
          max-width="24px"
          src="@/assets/Google-Assisant.png"
        ></v-img>
        Google Assisant</v-btn
      >
    </v-container>
    <v-sheet color="primary">
      <div class="text-center">
        <v-row class="px-4 pt-4" no-gutters>
          <v-col>Login</v-col>
          <v-col>About</v-col>
          <v-col>Support</v-col>
        </v-row>
        <v-row class="px-4" no-gutters>
          <v-col>Sign up</v-col>
          <v-col>Careers</v-col>
          <v-col>Contact</v-col>
        </v-row>
        <v-row class="px-4" no-gutters>
          <v-col>Sinapples</v-col>
          <v-col>Alexa</v-col>
          <v-col>Google</v-col>
        </v-row>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    margin-bottom: 3rem;
  }

  .home-page-title {
    text-align: center;
  }

  .documentation-link {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: #5d6788;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    text-decoration: none;
    width: fit-content;
    font-weight: 500;
  }
}
</style>
