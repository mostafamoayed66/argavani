import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart } from './actions';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
const Login = React.lazy(() => import('./views/Authenticate/login/Login'));
const Register = React.lazy(() => import('./views/Authenticate/register/Register'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Profile = React.lazy(() => import('./views/Profile/Profile'));
const CartPage = React.lazy(() => import('./views/CartPage/index'));
const CheckoutPage = React.lazy(() => import('./views/CheckoutPage/index'));
const OrderPage = React.lazy(() => import('./views/OrderPage/index'));
const OrderDetailsPage = React.lazy(() => import('./views/OrderDetailsPage/index'));
const ProductListPage = React.lazy(() => import('./views/ProductListPage/index'));
const ProductDetailsPage = React.lazy(() => import('./views/ProductDetailsPage/index'));

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/" name="Home" component={Dashboard} />
          <Route path="/login" name="Login Page" component={Login} />
          <Route path="/register" name="Register Page" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route path="/product/:productSlug/:productId/p" component={ProductDetailsPage} />
          <Route path="/product/:slug" component={ProductListPage} />
          <Redirect to="/" />
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );

}

export default App;
