<template>
  <div class="page-wrapper">
    <v-card>
      <v-card-title class="text-center">Hello Josh</v-card-title>

      <v-card-text>
        <v-card-title style="color:black" class="text-center"
          >Do you bring everything?</v-card-title
        >
        <Checklist />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Checklist from '@/components/Dashboard/Checklist'

export default {
  components: { Checklist }
}
</script>

<style></style>
