<template>
  <div>
    <v-row>
      <v-col cols="7">
        <v-text-field
          v-model="activityName"
          outlined
          dense
          label="Create Activity"
          placeholder="Activity Name"
        ></v-text-field>
      </v-col>

      <v-spacer />
      <v-col>
        <v-btn
          :class="{ disabled: activityCreationPending }"
          color="primary darken-1"
          @click="addActivity"
        >
          <v-icon>mdi-plus</v-icon>Add
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { capitalizeWords } from '@/utils/languageUtil'

export default {
  data() {
    return {
      activityName: ''
    }
  },
  computed: mapState('activities', [
    'activityNameToCreate',
    'activityCreationPending'
  ]),
  methods: {
    ...mapMutations('activities', ['setActivityNameToCreate']),
    ...mapActions('activities', ['triggerAddActivityAction']),
    addActivity() {
      console.log(`click ${this.activityName}`)
      if (this.activityName) {
        const activity = {
          name: capitalizeWords(this.activityName),
          items: [],
          color: 'blue',
          rank: 5
        }
        this.setActivityNameToCreate(activity)
        this.triggerAddActivityAction()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.activity-action-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  .activity-name-input {
    padding-left: 5px;
    height: 30px;
    width: 150px;
    outline: none;
    font: inherit;
    border: 1px solid;
    border-color: #2c3e50;
    border-radius: 3px;
  }

  .create-activity-btn {
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
