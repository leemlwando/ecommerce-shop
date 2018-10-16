import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from './reducers';
import App from './components/App';
import Signup from './components/auth/Signup';
import Feature from './components/Feature';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Products from './containers/Products';
import Product from './containers/Product';
import Cart from './containers/CartContainer';

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signout" component={Signout} />
        <Route path="/feature" component={Feature} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/category/:id" component={Products} />
        <Route exact path="/product/:id" component={Product} />
        <Route exact path="/cart" component={Cart} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
