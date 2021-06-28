<template>
  <v-card color="secondary" dark>
    <v-sheet color="primary">
      <v-card-title class="justify-center">
        <v-icon class="mr-2" color="white">mdi-party-popper</v-icon>
        Thank you for using Pockets!
        <v-icon class="ml-2" color="white">mdi-party-popper</v-icon>
      </v-card-title>
    </v-sheet>

    <v-card-text class="  text-center">
      <div>
        <v-list-item-avatar class="ma-3" size="125" right rounded>
          <v-img
            src="https://firebasestorage.googleapis.com/v0/b/pockets-check.appspot.com/o/1C377174-3F9A-4F03-B42A-C1E68C5855C5.JPG?alt=media&token=f086d377-a289-4db9-a6f1-5436d4df55fc"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">
              Hi, I'm Josh!
            </v-list-item-title>
            <v-list-item-subtitle>
              I hope you found this Pockets helpful! If you like this app and
              want to support the devlopment</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>

        <span style="font-size:20px; color:black">🧋</span>
        You can buy me some bubble tea!
        <span style="font-size:20px; color:black">🧋</span>
        <div>
          <p />
          You can <strong> donate</strong> to me directly thru Venmo, Paypal,
          Buy me a boba
          <p />
        </div>
        @Sinapples on all platforms
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        color="blue lighten-2"
        class="mr-2"
        href="https://venmo.com/code?user_id=2003272562900992908"
        target="_blank"
        dark
      >
        Venmo
      </v-btn>
      <v-btn
        color="blue darken-1"
        class="mr-2"
        href="https://www.paypal.me/sinapples?locale.x=en_US"
        target="_blank"
        dark
      >
        PayPal
      </v-btn>
      <v-btn
        color="primary"
        class="mr-2"
        href="https://www.buymeacoffee.com/sinapples"
        target="_blank"
      >
        Buy Me Boba
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
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
          content: `Support the development of this app with boba`,
          id: 'desc'
        }
      ]
    }
  },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped></style>
