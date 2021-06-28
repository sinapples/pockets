<template>
  <div>
    <div class="main-wrapper">
      <v-row>
        <v-col cols="12"> </v-col>
        <UserCard class="mt-4" />
        <v-col cols="12">
          <PocketCard class="mt-4" />
        </v-col>
        <v-col cols="12">
          <SettingsCard class="mt-4" />
        </v-col>
      </v-row>
    </div>
    <!-- <v-col cols="12"> -->
    <Support class="mt-4" />
  </div>
  <!-- </v-col> -->
</template>

<script>
import { mapState } from 'vuex'
// import ProductList from '@/components/ProductList'
// import AddProduct from '@/components/AddProduct'
import UserCard from '@/components/Dashboard/UserCard'
import PocketCard from '@/components/Dashboard/PocketCard'
import SettingsCard from '@/components/Dashboard/SettingsCard'
import Support from '@/components/Support'

export default {
  components: { UserCard, SettingsCard, PocketCard, Support },
  computed: mapState('app', ['networkOnLine'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.products-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.product-list {
  margin: 20px 0;
}
</style>
