import router from '@/router'
import { isNil } from 'lodash'
import { createNewUserFromFirebaseAuthUser } from '@/misc/helpers'
import UsersDB from '@/firebase/users-db'

export default {
  /**
   * Callback fired when user login
   */
  login: async ({ commit, dispatch }, firebaseAuthUser) => {
    const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid)

    const user = isNil(userFromFirebase)
      ? await createNewUserFromFirebaseAuthUser(firebaseAuthUser)
      : userFromFirebase

    commit('setUser', user)
    dispatch('products/getUserProducts', null, { root: true })
    dispatch('activities/getUserActivities', null, { root: true })
    // dispatch('activities/updateSelectedEditActivity', null)
  },

  updateUser: async ({ commit }, updateData) => {
    // const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid)
    commit('setUserUpdating', true)
    await new UsersDB().update(updateData)
    const userFromFirebase = await new UsersDB().read(updateData.id)
    commit('setUser', userFromFirebase)
    commit('setUserUpdating', false)
  },

  /**
   * Callback fired when user logout
   */
  logout: ({ commit }) => {
    commit('setUser', null)
    commit('products/setProducts', null, { root: true })

    const currentRouter = router.app.$route
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push('/login')
    }
  }
}
