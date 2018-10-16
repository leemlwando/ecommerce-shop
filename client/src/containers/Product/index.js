import * as R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Cart from '../../components/Cart';
import {
  fetchProductById,
  addProductToCart,
  setProductPageStateToNull
} from '../../actions';
import { getProductById } from '../../selectors';

class Product extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchProductById(id);
  }

  componentWillUnmount() {
    let { id } = this.props.match.params;
    console.log('componeent will unmount called', id);
    this.props.setProductPageStateToNull(id);
  }

  renderFields() {
    const { product } = this.props;
    const columnFields = R.compose(
      R.toPairs,
      R.pick([
        'cpu',
        'camera',
        'size',
        'weight',
        'display',
        'battery',
        'memory'
      ])
    )(product);

    return columnFields.map(([key, value]) => (
      <div className="column" key={key}>
        <div className="ab-details-title">
          <p>{key}</p>
        </div>
        <div className="ab-details-info">{value}</div>
      </div>
    ));
  }

  renderContent() {
    const { product } = this.props;
    return (
      <div className="thumbnail">
        <div className="row">
          <div className="col-md-6">
            <img
              className="img-thumbnail"
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="col-md-6">{this.renderFields()}</div>
        </div>
        <div className="caption-full">
          <h4 className="pull-right">${product.price}</h4>
          <h4>{product.name}</h4>
          <p>{product.description}</p>
        </div>
      </div>
    );
  }

  renderSidebar() {
    const { product, addProductToCart } = this.props;
    return (
      <div>
        <p className="lead">Quick shop</p>
        <Cart />
        <div className="form-group">
          <h1>{product.name}</h1>
          <h2>${product.price}</h2>
        </div>
        <Link to="/products" className="btn btn-info btn-block">
          Back to store
        </Link>
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() => addProductToCart(product._id)}
        >
          Add to cart
        </button>
      </div>
    );
  }

  render() {
    const { product } = this.props;
    console.log(product);
    return (
      <div className="view-container">
        <div className="container">
          <div className="row">
            <div className="col-md-9">{product && this.renderContent()}</div>
            <div className="col-md-3">{product && this.renderSidebar()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    product: getProductById(state, state.productPage.id)
  };
};

const mapDispatchToProps = {
  fetchProductById,
  addProductToCart,
  setProductPageStateToNull
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
