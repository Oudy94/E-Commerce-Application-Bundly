/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Form, Button, InputGroup, FormControl, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'

const Filter = ({ keyword, pageNumber }) => {
  const dispatch = useDispatch()

  const [orderBy, setOrderBy] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState(11)
  const [maxPrice, setMaxPrice] = useState(14)
  const [rating, setRating] = useState(0)
  const [filter, setFilter] = useState(true)

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, orderBy, category, minPrice, maxPrice, rating))
  }, [dispatch, keyword, pageNumber, filter])

  const smColWidth = 6
  const mdColWidth = 3

  return (
    <Form onSubmit={(e) => {
      e.preventDefault()
      setFilter((current) => !current)
    }}>
  <Form.Row className="align-items-center">
    <Col sm={smColWidth} md={mdColWidth}>
      <Form.Control
        as="select"
        onChange={(e) => setCategory(e.target.value || '')}
      >
        {['Category', 'Vegan', 'Vegetarian'].map((cat, i) => (
          <option key={cat} value={i ? cat : ''}>{cat}</option>
        ))}
      </Form.Control>
    </Col>
    <Col sm={smColWidth} md={mdColWidth}>
      <Form.Control
        as="select"
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {['Rating', ...[...Array(5).keys()].map((i) => i + 1)].map((rat, i) => (
            <option key={rat} value={i}>{`Rating${i ? `: ${rat}` : ''}`}</option>
          ))}
      </Form.Control>
    </Col>
    <Col sm={smColWidth} md={mdColWidth}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Min Price</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="number"
          value={minPrice}
          onChange={(e) => {
            if (e.target.value >= 0) setMinPrice(e.target.value)
          }}
        />
      </InputGroup>
    </Col>
    <Col sm={smColWidth} md={mdColWidth}>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>Max Price</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          type="number"
          value={maxPrice}
          onChange={(e) => {
            if (e.target.value >= 0) setMaxPrice(e.target.value)
          }}
        />
      </InputGroup>
    </Col>

  </Form.Row>
  <Form.Row className="align-items-center">
    <Col>
      <Form.Check
        onChange={() => setOrderBy('hiPrice')}
        type="radio"
        label="Highest Price"
        name="sort"
        />
    </Col>
    <Col>
      <Form.Check
        onChange={() => setOrderBy('lowPrice')}
        type="radio"
        label="Lowest Price"
        name="sort"
        />
    </Col>
    <Col>
      <Form.Check
        onChange={() => setOrderBy('rating')}
        type="radio"
        label="Best Rating"
        name="sort"
      />
    </Col>
    <Col>
      <Form.Check
        onChange={() => setOrderBy('time')}
        type="radio"
        label="Newest"
        name="sort"
      />
    </Col>
    <Col xs="auto">
      <Button type="submit">Filter products</Button>
    </Col>
  </Form.Row>
</Form>
  )
}

export default Filter
