export default {
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
  }
}
