import React, { useEffect } from 'react'
import { Route, useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import PlanScreen from './screens/PlanScreen'
import SubscriptionsScreen from './screens/SubscriptionsScreen'
import ReactGA from 'react-ga'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { createRoutesHistory } from './actions/userActions'

function usePageViews() {
  let location = useLocation()
  const dispatch = useDispatch()
  useEffect(() => {
    const getAnalytic = async () => {
      const { data: TRACK_ID } = await axios.get('/api/config/googleAnalytic')

      if (!window.GA_INITIALIZED) {
        ReactGA.initialize(TRACK_ID)
        window.GA_INITIALIZED = true
      }
      ReactGA.set({ page: location.pathname })
      dispatch(createRoutesHistory(location.pathname))
      ReactGA.pageview(location.pathname)
    }
    getAnalytic()
  }, [dispatch, location])
}

const App = () => {
  usePageViews()

  return (
    <main>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/plan/:id?/:orderItemId?' component={PlanScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping/:id?' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/subscriptions' component={SubscriptionsScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </main>
  )
}

export default App
