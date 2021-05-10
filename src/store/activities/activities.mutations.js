export default {
  /* Product input name */
  setProductNameToCreate: (state, productNameToCreate) =>
    (state.productNameToCreate = productNameToCreate),

  /* Products */
  setProducts: (state, activities) => (state.activities = activities),
  addProduct: (state, product) => state.products.push(product),
  removeProductById: (state, productId) => {
    const index = state.products.findIndex(product => product.id === productId)
    state.activities.splice(index, 1)
  },

  /* Products deletion */
  addProductDeletionPending: (state, productId) =>
    state.productDeletionPending.push(productId),
  removeProductDeletionPending: (state, productId) => {
    const index = state.activities.findIndex(
      product => product.id === productId
    )
    state.productDeletionPending.splice(index, 1)
  },

  /* Product creation */
  setProductCreationPending: (state, value) =>
    (state.productCreationPending = value)
}
