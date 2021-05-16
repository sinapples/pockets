import UserActivitiesDB from '@/firebase/user-activities-db'

export default {
  /**
   * Fetch activities of current loggedin user
   */
  getUserActivities: async ({ rootState, commit }) => {
    const userActivityDb = new UserActivitiesDB(
      rootState.authentication.user.id
    )

    const activities = await userActivityDb.readAll()
    commit('setActivities', activities)
    commit('setSelectedEditActivity', null)
  },

  /**
   * Create a activity for current loggedin user
   */
  createUserActivity: async ({ commit, rootState }, activity) => {
    const userActivityDb = new UserActivitiesDB(
      rootState.authentication.user.id
    )

    commit('setActivityCreationPending', true)
    const createdActivity = await userActivityDb.create(activity)
    commit('addActivity', createdActivity)
    commit('setActivityCreationPending', false)
    commit('setSelectedEditActivity', activity)
  },

  /**
   * Create a new activity for current loggedin user and reset activity name input
   */
  triggerAddActivityAction: ({ dispatch, state, commit }) => {
    if (state.activityNameToCreate === '') return

    const activity = state.activityNameToCreate
    commit('setActivityNameToCreate', '')
    dispatch('createUserActivity', activity)
  },

  /**
   * Delete a user activity from its id
   */
  deleteUserActivity: async ({ rootState, commit, getters }, activityId) => {
    if (getters.isActivityDeletionPending(activityId)) return

    const userActivitiesDb = new UserActivitiesDB(
      rootState.authentication.user.id
    )

    commit('addActivityDeletionPending', activityId)
    await userActivitiesDb.delete(activityId)
    commit('removeActivityById', activityId)

    commit('removeActivityDeletionPending', activityId)
    commit('setSelectedEditActivity', null)
  },

  /**
   * Delete a user activity from its id
   */
  updateUserActivity: async ({ rootState, commit }, activity) => {
    console.log('updateUserActivity')
    console.log(activity)
    const userActivitiesDb = new UserActivitiesDB(
      rootState.authentication.user.id
    )
    commit('setActivityCreationPending', true)
    const activityId = await userActivitiesDb.update(activity)
    console.log('item')
    console.log(activityId)
    commit('updateActivityById', activityId, activity)
    commit('setActivityCreationPending', false)
    const activities = await userActivitiesDb.readAll()
    commit('setActivities', activities)
    commit('setSelectedEditActivity', activity)
  },

  updateSelectedEditActivity: ({ commit }, activity) => {
    commit('setSelectedEditActivity', activity)
  }
}
