import './App.css';
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails';

// Cart Imports
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import ConfirmOrder from './components/cart/ConfirmOrder'
import Payment from './components/cart/Payment'
import OrderSuccess from './components/cart/OrderSuccess'
// Order Imports
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'
// Auth or User Imports
import Login from './components/user/Login';
import Register from './components/user/Register'
import Profile from './components/user/Profile'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
// Admin Imports
import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductsList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions'
import store from './store'
import axios from 'axios'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import ProductReviews from './components/admin/ProductReviews';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())
    async function getStripApiKey() {
      const { data } = await axios.get('/stripeapi')
      setStripeApiKey(data.stripeApiKey);
    }
    getStripApiKey();
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>

            <Route exact path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/password/forgot" element={<ForgotPassword />} />
            <Route exact path="/password/reset/:token" element={<NewPassword />} />

            <Route exact path="/me" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route exact path="/me/update" element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            } />

            <Route exact path="/password/update" element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            } />

            <Route exact path="/orders/me" element={
              <ProtectedRoute>
                <ListOrders />
              </ProtectedRoute>
            } />

            <Route exact path="/order/:id" element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            } />

            <Route path="/shipping" element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            } />

            <Route path="/order/confirm" element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            } />

            <Route path="/success" element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            } />

            {stripeApiKey &&
              <Route path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute>
                      <Payment />
                    </ProtectedRoute>
                  </Elements>
                }
              />
            }
          </Routes>
        </div>
        <Routes>

          <Route exact path="/dashboard" element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route exact path="/admin/products" element={
            <ProtectedRoute isAdmin={true}>
              <ProductsList />
            </ProtectedRoute>
          } />

          <Route exact path="/admin/product" element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          } />
          <Route exact path="/admin/product/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          } />
          <Route exact path="/admin/orders" element={
            <ProtectedRoute isAdmin={true}>
              <OrdersList />
            </ProtectedRoute>
          } />
          <Route exact path="/admin/order/:id" element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          } />
          <Route exact path="/admin/users" element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          } />
          <Route exact path="/admin/user/:id" element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          } />
          <Route exact path="/admin/reviews" element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>
          } />
        </Routes>
          {!loading && (!isAuthenticated || user.role !== "admin") && (
            <Footer />
          )}
        
      </div>
    </BrowserRouter>
  );
}
export default App;
