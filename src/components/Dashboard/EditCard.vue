<template>
  <div class="page-wrapper">
    <v-card>
      <v-card-title class="text-center">Edit Items</v-card-title>

      <v-card-title style="color:black">
        New activity
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field outlined dense label="Activity Name"></v-text-field>
          </v-col>
          <v-spacer />
          <v-col>
            <v-btn><v-icon>mdi-plus</v-icon>Create Activity</v-btn>
          </v-col>
        </v-row>
        <v-combobox
          v-model="select"
          item-text="displayName"
          item-key="displayName"
          :items="items"
          label="Combobox"
          outlined
          dense
        ></v-combobox>
        <Checklist />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Checklist from '@/components/Dashboard/Checklist'

export default {
  components: { Checklist },
  data() {
    return {
      select: '',
      items: [
        { displayName: 'Always Bring', name: 'default' },
        { displayName: 'Work', name: 'work' },
        { displayName: 'Gym', name: 'Gym' },
        { displayName: 'Studying', name: 'Studying' },
        { displayName: 'Shopping', name: 'Shopping' }
      ]
    }
  }
}
</script>

<style></style>
