<template>
  <div class="page-wrapper">
    <v-card>
      <v-card-title class="text-center">Edit Items</v-card-title>

      <v-card-title style="color:black">
        New activity
      </v-card-title>
      <v-card-text>
        <AddActivity />

        <ListActivities />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AddActivity from '@/components/Dashboard/EditMenu/AddActivity'
import ListActivities from '@/components/Dashboard/EditMenu/ListActivities'

export default {
  components: { AddActivity, ListActivities },

  data() {
    return {
      select: '',
      headers: [
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name'
        }
      ],
      items: [
        { displayName: 'Always Bring', name: 'default' },
        { displayName: 'Work', name: 'work' },
        { displayName: 'Gym', name: 'Gym' },
        { displayName: 'Studying', name: 'Studying' },
        { displayName: 'Shopping', name: 'Shopping' }
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
