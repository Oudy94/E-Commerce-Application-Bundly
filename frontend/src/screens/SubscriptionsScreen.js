import React, { useState, useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyOrders } from '../actions/orderActions'
import { cancelSbuscription } from '../actions/subscriptionActions'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const subscriptionCancel = useSelector((state) => state.subscriptionCancel)
  const { success: successDelete } = subscriptionCancel

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      dispatch(listMyOrders())
    }
  }, [dispatch, history, userInfo, successDelete])

  const cancelSubscriptionHandler = (id, orderItemId) => {
    if (window.confirm('Are you sure')) {
      dispatch(cancelSbuscription(id, orderItemId))
    }
  }

  return (
    <Row>
      <Col md={12}>
        <h2>My Subscriptions</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th></th>
                <th>ID</th>
                <th>BUNDLE</th>
                <th>DATE</th>
                <th>SIZE</th>
                <th>QTY</th>
                <th>PRICE</th>
                <th>PREFRENCES</th>
                <th>ADDRESS</th>
                <th>CANCEL</th>
              </tr>
            </thead>
            {orders.map((order) => (
              <tbody key={order._id}>
                {order.orderItems.map((subscriptions) => (
                  <tr key={subscriptions._id}>
                    <td>
                      <img
                        src={subscriptions.image}
                        alt={subscriptions.name}
                        width='50px'
                        height='30px'
                      />
                    </td>
                    <td>{subscriptions._id}</td>
                    <td>{subscriptions.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{subscriptions.size}</td>
                    <td>{subscriptions.qty}</td>
                    <td>{subscriptions.price}</td>
                    <td>
                      <LinkContainer
                        to={`/plan/${order._id}/${subscriptions._id}`}
                      >
                        <Button className='btn-sm' variant='light'>
                          Prefrences
                        </Button>
                      </LinkContainer>
                    </td>
                    <td>
                      <LinkContainer to={`/shipping/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Address
                        </Button>
                      </LinkContainer>
                    </td>
                    <td>
                      <Button
                        className='btn-sm'
                        variant='danger'
                        onClick={() => {
                          cancelSubscriptionHandler(
                            order._id,
                            subscriptions._id
                          )
                        }}
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
