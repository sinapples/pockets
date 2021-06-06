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
    find(state.activities, activity => activity.id === activityId)
}
