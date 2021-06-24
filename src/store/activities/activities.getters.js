import { find } from 'lodash'

export default {
  /**
   * Check if a activity has deletion pending
   */
  isActivityDeletionPending: state => activityId =>
    state.activityDeletionPending.includes(activityId),

  /**
   * Get activity by id
   */
  getActivityById: state => activityId =>
    find(state.activities, activity => activity.id === activityId),

  // Remove Always bring from the selectable options
  activities: state => {
    if (state.activities) {
      return state.activities.filter(
        activity => activity.name !== 'Always Bring'
      )
    }

    return state.activities
    // .filter(activity => activity.name === 'Always Bring')
  }
}
