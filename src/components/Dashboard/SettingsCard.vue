<template>
  <div class="page-wrapper">
    <v-card>
      <v-card color="secondary" dark @click="editMode = !editMode">
        <v-card-title>
          <v-icon class="mr-2">mdi-cog</v-icon>Settings

          <v-spacer />
          <v-icon large>{{
            editMode ? 'mdi-chevron-up' : 'mdi-chevron-down'
          }}</v-icon>
        </v-card-title>
      </v-card>
      <v-expand-transition>
        <div v-show="editMode">
          <EditActivities />

          <EditUserInfo />
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
// import AddActivity from '@/components/Dashboard/EditMenu/AddActivity'
import EditActivities from '@/components/Dashboard/EditMenu/EditActivities'
import EditUserInfo from '@/components/Dashboard/EditMenu/EditUserInfo'

export default {
  components: { EditActivities, EditUserInfo },

  data() {
    return {
      select: '',
      editMode: !false,
      headers: [
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('products', ['isProductDeletionPending']),
    ...mapState('activities', ['activities']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: mapActions('activities', ['deleteUserProduct'])
}
</script>

<style></style>
