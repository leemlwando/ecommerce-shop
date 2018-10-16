import * as R from 'ramda';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeProductFromCart, emptyCart, cartCheckout } from '../../actions';

class CartContainer extends Component {
  render() {
    const { products } = this.props;
    console.log(products, 'products ------------------');
    const isCartEmpty = R.isEmpty(products);
    
    // const count = products.length;
    const renderContent = () => (
      <div>
        {isCartEmpty && <div>Your shopping cart is empty</div>}
        <div className="table-responsive">
          {/* <div>{count}</div> */}
          <table className="table-bordered table-striped table-condensed cf">
            <tbody>
              {/* {products.map((product, index) => (
                <tr key={index} className="item-checkout">
                  <td className="first-column-checkout">
                    <img
                      className="img-thumbnail"
                      src={product.image}
                      alt={product.name}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.count}</td>
                  <td>
                    <span
                      className="delete-cart"
                      onClick={() => removeProductFromCart(product._id)}
                    >
                      delete
                    </span>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
        {R.not(isCartEmpty) && (
          <div className="row">
            <div className="pull-right total-user-checkout">
              {/* <b>Total</b>${totalPrice} */}
            </div>
          </div>
        )}
      </div>
    );

    const renderSideBar = () => (
      <div>
        <Link className="btn btn-info" to="/products">
          <span className="glyphicon glyphicon-info-sign" />
          <span>Continue Shopping</span>
        </Link>
        {R.not(isCartEmpty) && (
          <div>
            <button onClick={() => emptyCart()} className="btn btn-danger">
              <span className="glyphicon glyphicon-trash" />
              Empty Cart
            </button>
            <button
              className="btn btn-success"
              onClick={() => cartCheckout(products)}
            >
              <span className="glyphicon glyphicon-envelope" />
              Check Out
            </button>
          </div>
        )}
      </div>
    );

    return (
      <div className="view-container">
        <div className="container">
          <div className="row">
            <div className="col-md-9">{renderContent()}</div>
            <div className="col-md-3 btn-user-checkout">{renderSideBar()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.cart
});

const mapDispatchToProps = {
  removeProductFromCart,
  emptyCart,
  cartCheckout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer);
