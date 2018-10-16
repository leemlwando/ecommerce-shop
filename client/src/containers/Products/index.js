import * as R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchProducts,
  fetchCategories,
  loadMoreProducts,
  addProductToCart
} from '../../actions';
import { getProducts } from '../../selectors';
import SideBar from '../../components/SideBar';

class Products extends Component {
  componentDidMount() {
    this.props.fetchProducts();
    this.props.fetchCategories();
  }

  renderProduct(product, index) {
    const { addProductToCart } = this.props;
    const shortDescription = `${R.take(60, product.description)}...`;
    return (
      <div className="col-sm-4 col-lg-4 col-md-4 book-list" key={index}>
        <div className="thumbnail">
          <img
            className="img-thumbnail"
            src={product.image}
            alt={product.name}
          />
          <div className="caption">
            <h4 className="pull-right">${product.price}</h4>
            <h4>
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </h4>
            <p>{shortDescription}</p>
            <p className="itemButton">
              <button
                onClick={() => addProductToCart(product._id)}
                className="btn btn-primary"
              >
                Buy Now!
              </button>
              <Link to={`/product/${product._id}`} className="btn btn-default">
                More info
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { products, loadMoreProducts } = this.props;
    console.log(products);
    return (
      <div>
        <div className="col-md-4">
          <SideBar />
        </div>
        <div className="books col-md-8">
          <h2>Products</h2>
          {products.map((product, index) => this.renderProduct(product, index))}
        </div>
        <div className="row">
          <div className="col-md-12">
            <button
              onClick={loadMoreProducts}
              className="pull-right btn btn-primary"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  products: getProducts(state, ownProps)
});

const mapDispatchToProps = {
  fetchProducts,
  fetchCategories,
  loadMoreProducts,
  addProductToCart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
