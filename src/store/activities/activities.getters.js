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
      return state.activities
        .filter(activity => activity.name !== 'Always Bring')
        .sort((firstEl, secondEl) => {
          if (firstEl.rank < secondEl.rank) {
            return -1
          }
          if (firstEl.rank > secondEl.rank) {
            return 1
          }

          // Alpahbet
          if (firstEl.name < secondEl.name) {
            return -1
          }
          if (firstEl.name > secondEl.name) {
            return 1
          }
          return 0
        })
    }

    return state.activities
    // .filter(activity => activity.name === 'Always Bring')
  }
}
