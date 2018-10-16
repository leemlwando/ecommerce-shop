import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Cart = ({ totalCartCount, totalPrice }) => (
  <div className="cart">
    <div className="dropdown">
      <Link
        to="/cart"
        id="dLabel"
        className="btn btn-inverse btn-block btn-lg"
      >
        <i className="fa fa-fa-shopping-cart" />
        <span>
          {totalCartCount} item(s) - ${totalPrice}
        </span>
      </Link>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    totalCartCount: state.totalCartCount,
    totalPrice: state.totalPrice
  };
};

export default connect(
  mapStateToProps,
  null
)(Cart);