<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="activityName"
          outlined
          dense
          label="Activity Name"
        ></v-text-field>
      </v-col>

      <v-spacer />
      <v-col>
        <v-btn
          :class="{ disabled: productCreationPending }"
          @click="addActivity"
        >
          <v-icon>mdi-plus</v-icon>Create Activity</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      activityName: ''
    }
  },
  computed: mapState('products', [
    'productNameToCreate',
    'productCreationPending'
  ]),
  methods: {
    ...mapMutations('products', ['setProductNameToCreate']),
    ...mapActions('products', ['triggerAddProductAction']),
    addActivity() {
      console.log(`click${this.activityName}`)
      this.setProductNameToCreate(this.activityName)
      this.triggerAddProductAction()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.product-action-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  .product-name-input {
    padding-left: 5px;
    height: 30px;
    width: 150px;
    outline: none;
    font: inherit;
    border: 1px solid;
    border-color: #2c3e50;
    border-radius: 3px;
  }

  .create-product-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    border-color: #2c3e50;

    &.disabled {
      pointer-events: none;
      background-color: #aaa;
    }

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>
