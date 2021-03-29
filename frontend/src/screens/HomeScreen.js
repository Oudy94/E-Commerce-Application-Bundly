import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Bundly from '../components/Bundly'
import BundleCategory from '../components/BundleCategory'
import Meta from '../components/Meta'
import Filter from '../components/Filter'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  // useEffect was moved to Filter component which now initiates
  //  data fetching from the backend

  return (
    <>
      <Meta />

      {!keyword ? (
          <Bundly />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}

      <h1 className='homepage-headings'>Latest Products</h1>
      <Filter keyword={keyword} pageNumber={pageNumber} />
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
        </>
      )}

      <h1 className='homepage-headings my-5'>Bundle Categories</h1>
      <BundleCategory />
    </>
  )
}

export default HomeScreen
