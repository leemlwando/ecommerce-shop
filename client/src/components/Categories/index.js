import * as R from 'ramda';
import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { getCategories, getActiveCategoryId } from '../../selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';

const Categories = ({ categories, activeCategoryId }) => {
  console.log(activeCategoryId, 'activecategoryid');

  const renderCategory = (category, index) => {
    const getActiveState = R.propEq('id', activeCategoryId);

    const linkClass = classNames({
      'list-group-item': true,
      active: getActiveState(category)
    });

    return (
      <Link to={`/category/${category.id}`} className={linkClass} key={index}>
        {category.name}
      </Link>
    );
  };

  const renderAllCategory = () => {
    const linkClass = classNames({
      'list-group-item': true,
      active: R.isNil(activeCategoryId)
    });

    return (
      <Link to="/products" className={linkClass}>
        All
      </Link>
    );
  };

  return (
    <div className="well">
      <h4>Brand</h4>
      <div className="list-group">
        {renderAllCategory()}
        {categories.map((category, index) => renderCategory(category, index))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: getCategories(state),
  activeCategoryId: getActiveCategoryId(ownProps)
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Categories);
