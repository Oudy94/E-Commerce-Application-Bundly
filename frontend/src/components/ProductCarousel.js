import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  // const productTopRated = useSelector((state) => state.productTopRated)
  // const { loading, error, products } = productTopRated
  // console.log(products)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-light mb-5 carousel'>
      {product.foodItems?.map((item) => (
        <Carousel.Item key={item._id}>
          <Row className='p-3'>
            <Image src={item.farmer.image} alt={item.farmer.name} />
            <h2>{item.farmer.name}</h2>
            <p>{item.farmer.description}</p>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
