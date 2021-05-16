import GenericDB from './generic-db'

import firestore from './async-firestore'

export default class UserActivitiesDB extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/activities`)
  }

  /**
   * Delete a document in the collection
   * @param id
   */
  async addItem(id, item) {
    return (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .get('items')
      .add(item)
  }

  // Here you can extend UserProductsDB with custom methods
}
