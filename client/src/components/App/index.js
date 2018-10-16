import React from 'react';
import Header from '../Header';

export default ({ children }) => {
  return (
    <div className="view-container">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">{children}</div>
        </div>
      </div>
    </div>
  );
};
