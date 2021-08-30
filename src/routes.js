import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Profile = React.lazy(() => import('./views/Profile/Profile'));

const CartPage = React.lazy(() => import('./views/CartPage/index'));

const CheckoutPage = React.lazy(() => import('./views/CheckoutPage/index'));

const OrderPage = React.lazy(() => import('./views/OrderPage/index'));
const OrderDetailsPage = React.lazy(() => import('./views/OrderDetailsPage/index'));

const ProductListPage = React.lazy(() => import('./views/ProductListPage/index'));
const ProductListPageDetailsPage = React.lazy(() => import('./views/ProductDetailsPage/index'));

// const Page404 = React.lazy(() => import('./views/Authenticate/page404/Page404'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  
  { path: '/Profile', name: 'Colors', component: Profile },
  
  { path: '/cart', name: 'Cart', component: CartPage },
  
  { path: '/checkout', name: 'Checkout', component: CheckoutPage },
  
  { path: '/order_details/:orderId', name: 'OrderDetails', component: OrderDetailsPage },
  { path: '/account/orders', name: 'Order', component: OrderPage },
  
  { path: '/:productSlug/:productId/p', name: 'OrderDetails', component: ProductListPageDetailsPage },
  { path: '/:slug', name: 'Order', component: ProductListPage },
  // { name: '404', component: Page404 },
  
];

export default routes;
