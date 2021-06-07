export default {
  // Changes the state

  /* Activity input name */
  setActivityNameToCreate: (state, activityNameToCreate) =>
    (state.activityNameToCreate = activityNameToCreate),

  /* Activities */
  setActivities: (state, activities) => (state.activities = activities),
  addActivity: (state, activity) => state.activities.push(activity),
  removeActivityById: (state, activityId) => {
    const index = state.activities.findIndex(
      activity => activity.id === activityId
    )
    state.activities.splice(index, 1)
  },

  /* Activities deletion */
  addActivityDeletionPending: (state, activityId) =>
    state.activityDeletionPending.push(activityId),
  removeActivityDeletionPending: (state, activityId) => {
    const index = state.activities.findIndex(
      activity => activity.id === activityId
    )
    state.activityDeletionPending.splice(index, 1)
  },

  /* Activity creation */
  setActivityCreationPending: (state, value) =>
    (state.activityCreationPending = value),

  /* Activity creation */
  setActivityUpdatePending: (state, value) =>
    (state.activityUpdatePending = value),

  updateActivityById: (state, activityId, updatedActivity) => {
    const index = state.activities.findIndex(
      activity => activity.id === activityId
    )
    state.activities[index] = updatedActivity
  },

  setSelectedEditActivity: (state, selectedEditActivity) => {
    if (selectedEditActivity === null) {
      if (state.activities.length === 0) {
        state.selectedEditActivity = {}
      }
      // eslint-disable-next-line prefer-destructuring
      state.selectedEditActivity = state.activities[0]
    } else {
      state.selectedEditActivity = selectedEditActivity
    }
  },

  addRemoveSelectedActivity: (state, id) => {
    const index = state.selectedActivities.findIndex(item => item === id)
    if (index === -1) {
      state.selectedActivities.push(id)
    } else {
      state.selectedActivities.splice(index, 1)
    }
  }
}
