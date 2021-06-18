<template>
  <div class="main-wrapper">
    <v-row>
      <UserCard class="mt-4" />
      <PocketCard class="mt-4" />
      <EditCard class="mt-4" />
    </v-row>
    <!-- <div class="page-wrapper">
      <h1 class="products-page-title">Dashboard page</h1>
      <product-list class="product-list"></product-list>
      <add-product v-if="networkOnLine"></add-product>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import ProductList from '@/components/ProductList'
// import AddProduct from '@/components/AddProduct'
import UserCard from '@/components/Dashboard/User/UserCard'
import PocketCard from '@/components/Dashboard/PocketCard'
import EditCard from '@/components/Dashboard/EditCard'

export default {
  components: { UserCard, EditCard, PocketCard },
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
