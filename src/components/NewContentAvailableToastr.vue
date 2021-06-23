<template>
  <span>
    <span v-if="refreshingApp">
      <v-btn class="refresh-btn" color="secondary" :ripple="false">
        Loading new content
      </v-btn>
    </span>
    <span v-else>
      <v-btn
        class="refresh-btn"
        color="secondary"
        small
        @click="$emit('refresh')"
      >
        Tap to Update
      </v-btn>
    </span>
  </span>
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
