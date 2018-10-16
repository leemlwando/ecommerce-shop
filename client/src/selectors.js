import * as R from 'ramda';

export const getProductById = (state, id) => R.prop(id, state.products);

export const getActiveCategoryId = ownProps => {
  const id = ownProps.match.params.id;

  console.log(id);
  return id;
};

export const getProducts = (state, ownProps) => {
  const activeCategoryId = getActiveCategoryId(ownProps);

  const applySearch = item =>
    R.contains(state.productsPage.search, R.prop('name', item));
  const applyCategory = item =>
    R.equals(activeCategoryId, R.prop('categoryId', item));

  const products = R.compose(
    R.filter(applySearch),
    R.when(R.always(activeCategoryId), R.filter(applyCategory)),
    R.map(_id => getProductById(state, _id))
  )(state.productsPage.ids);

  return products;
};

export const getRenderedProductsLength = state =>
  R.length(state.productsPage.ids);

export const getTotalCartCount = state => R.length(state.cart);

export const getCategories = state => R.values(state.categories);


