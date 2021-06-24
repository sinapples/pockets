import UsersDB from '@/firebase/users-db'
import UsersActivities from '@/firebase/user-activities-db'

/**
 * Create new user from firebase auth user infos
 */
// eslint-disable-next-line
export const createNewUserFromFirebaseAuthUser = async firebaseAuthUser => {
  const providerData = firebaseAuthUser.providerData[0]
  const { displayName, photoURL, email } = providerData
  const userDb = new UsersDB()

  const user = {
    displayName,
    photoURL,
    email,
    zipCode: 78701,
    units: 'imperial'
  }

  const userObj = await userDb.create(user, firebaseAuthUser.uid)

  const userActivity = await new UsersActivities(userObj.id)
  await userActivity.create({
    name: 'Always Bring',
    items: [
      { name: 'Wallet' },
      { name: 'Phone' },
      { name: 'Keys' },
      { name: 'Mask' }
    ],
    rank: 0
  })
  await userActivity.create({
    name: 'Work',
    items: [{ name: 'Badge' }],
    rank: 0
  })
  await userActivity.create({
    name: 'Exercise',
    items: [{ name: 'Water' }, { name: 'Gym Bag' }],
    rank: 0
  })
  console.log(userObj)
  return userObj
}
