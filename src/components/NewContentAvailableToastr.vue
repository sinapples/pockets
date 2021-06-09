<template>
  <div>
    <template v-if="refreshingApp">
      <v-btn class="refresh-btn" color="secondary" :ripple="false">
        Loading new content
      </v-btn>
    </template>
    <template v-else>
      <v-btn class="refresh-btn" color="secondary" @click="$emit('refresh')">
        Tap to Update
      </v-btn>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    refreshingApp: Boolean
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  display: inline-block;
  border-radius: 4px;
}
.refresh-btn {
  cursor: pointer;
  text-transform: none;
  letter-spacing: 0px;
}
</style>
