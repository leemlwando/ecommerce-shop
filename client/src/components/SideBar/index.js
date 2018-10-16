import React from 'react';
import Cart from '../Cart';
import Search from '../Search';
import Categories from '../Categories';

const Sidebar = () => {
  return (
    <div>
      <Cart />
      <Search />
      <Categories />
    </div>
  );
};

export default Sidebar;
