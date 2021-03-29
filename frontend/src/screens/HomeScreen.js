import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Bundly from '../components/Bundly'
import BundleCategory from '../components/BundleCategory'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import GoogleMap from '../components/GoogleMap'
import farmeDetails from '../farmeDetails'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const [apikey, setApiKey] = useState('')
  const [isloading, setIsLoading] = useState(false)
  const [haserror, setHasError] = useState(false)

  useEffect(() => {
    const getApiKey = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get('/api/config/googleMap')
        if (data) {
          setApiKey(data)
        } else {
          throw new Error('failed to fetch the api key')
        }
      } catch (error) {
        console.log(error)
        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    dispatch(listProducts(keyword, pageNumber))
    getApiKey()
  }, [dispatch, keyword, pageNumber, apikey])

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <Bundly />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1 className='homepage-headings my-5'>Bundle Categories</h1>
      <BundleCategory />
      <h1 className='homepage-headings my-5'>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
          <Row>
            {isloading ? (
              <Loader />
            ) : haserror ? (
              'Error in loading the map'
            ) : apikey ? (
              <GoogleMap data={farmeDetails} apikey={apikey} />
            ) : (
              <Loader />
            )}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
