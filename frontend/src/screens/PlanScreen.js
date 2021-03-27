import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createPlan } from '../actions/planActions'
import { listProducts } from '../actions/productActions'
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  ButtonGroup,
  Image,
} from 'react-bootstrap'
import { updateSubscriptionPreferences } from '../actions/subscriptionActions'
import { SUBSCRIPTION_UPDATE_PREFRENCES_CLEAR } from '../constants/subscriptionConstants'

const PlanScreen = ({ history, match }) => {
  const [bundle, setBundle] = useState('')
  const [persons, setPersons] = useState('')
  const [bundlePerWeek, setBundlePerWeek] = useState('')
  const [bundleName, setBundleName] = useState()
  const [bundleImage, setBundleImage] = useState()
  const [bundlePrice, setBundlePrice] = useState()

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products } = productList

  const subscriptionUpdatePrefrences = useSelector(
    (state) => state.subscriptionUpdatePrefrences
  )
  const { order } = subscriptionUpdatePrefrences

  const family = [2, 3, 4]
  const weekly = [3, 4, 6]

  useEffect(() => {
    if (order) {
      history.push('/subscriptions')
      dispatch({
        type: SUBSCRIPTION_UPDATE_PREFRENCES_CLEAR,
      })
    }
    if (products.length === 0) {
      dispatch(listProducts(keyword, pageNumber))
    }
  }, [dispatch, keyword, pageNumber, order])

  const submitHandler = (e) => {
    e.preventDefault()
    const size = Number(persons)
    const qty = Number(bundlePerWeek)
    const price = Number(bundlePrice)
    if (match.params.id && match.params.orderItemId) {
      //Calculate prices
      const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }

      const totalBundlePrice = addDecimals(price * qty)
      const shippingPrice = addDecimals(totalBundlePrice > 100 ? 0 : 5)
      const taxPrice = addDecimals(Number((0.12 * totalBundlePrice).toFixed(2)))
      const totalPrice = (
        Number(price) +
        Number(shippingPrice) +
        Number(taxPrice)
      ).toFixed(2)

      dispatch(
        updateSubscriptionPreferences(
          {
            taxPrice,
            shippingPrice,
            totalPrice,
            newBundleId: bundle,
            size,
            qty,
            price,
            name: bundleName,
            image: bundleImage,
          },
          match.params.id,
          match.params.orderItemId
        )
      )
    } else {
      dispatch(createPlan(bundle, qty, size))
      history.push(`/cart/${bundle}?qty=${qty}&size=${size}`)
    }
  }

  return (
    <Container className='p-3 '>
      <Row className='justify-content-md-center'>
        <h1>What is the best Bundle for you</h1>
      </Row>
      <Form onSubmit={submitHandler}>
        <Row className=' shadow p-3 mb-5 bg-body rounded'>
          <Col md={{ span: 4, offset: 1 }}>
            <h2>Select the healthy bundle for you</h2>
            {products.map((product) => (
              <Row className='mb-3' key={product._id}>
                <Col md={4}>
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </Link>
                </Col>
                <Col md={6}>
                  <Button
                    variant='outline-success'
                    className='rounded mt-3'
                    active={bundle === product._id ? true : false}
                    value={product._id}
                    onClick={(e) => {
                      setBundle(e.target.value)
                      setBundleName(product.name)
                      setBundleImage(product.image)
                      setBundlePrice(product.price)
                    }}
                  >
                    <i className='fas fa-hands'></i> {product.name}
                  </Button>
                </Col>
              </Row>
            ))}
          </Col>

          <Col md={{ span: 4, offset: 2 }}>
            <h2>Select the size of your bundle</h2>
            <Row className='mt-4'>
              <Col>
                <h5>Number of people</h5>
              </Col>
              <Col>
                <ButtonGroup>
                  {family.map((person) => (
                    <Button
                      key={person + 100}
                      variant='outline-success'
                      active={persons == person ? true : false}
                      className='rounded me-3'
                      value={person}
                      onClick={(e) => {
                        setPersons(e.target.value)
                      }}
                    >
                      {person}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col>
                <h5>Weekly Bundles</h5>
              </Col>
              <Col>
                <ButtonGroup>
                  {weekly.map((number) => (
                    <Button
                      key={number + 300}
                      variant='outline-success'
                      active={bundlePerWeek == number ? true : false}
                      className='rounded'
                      value={number}
                      onClick={(e) => {
                        setBundlePerWeek(e.target.value)
                      }}
                    >
                      {number}
                    </Button>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className='justify-content-md-center'>
          <Button
            type='submit'
            variant='success'
            disabled={!bundle || !persons || !bundlePerWeek}
            className='shadow p-3 mb-5 bg-body rounded'
          >
            Select This
          </Button>
        </Row>
      </Form>
    </Container>
  )
}

export default PlanScreen
