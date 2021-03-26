import React, { useState, useEffect } from 'react'
import { ButtonToolbar, ButtonGroup, DropdownButton, Dropdown, InputGroup, FormControl, Nav } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { listProducts } from '../actions/productActions'

const categories = ['Vegan', 'Vegetarian']

const Filter = ({ keyword, pageNumber }) => {
  const dispatch = useDispatch()

  const [orderBy, setOrderBy] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState(11)
  const [maxPrice, setMaxPrice] = useState(14)
  const [rating, setRating] = useState(0)

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, orderBy, category, minPrice, maxPrice, rating))
  }, [dispatch, keyword, pageNumber, orderBy, category, minPrice, maxPrice, rating])

  return (
    <>
      <ButtonToolbar>

        <ButtonGroup>
          <DropdownButton as={ButtonGroup} size="sm" title={category || 'Category'}>
            {['all', ...categories].map((cat, i) => (
              <Dropdown.Item onSelect={() => setCategory(i ? cat : '')}>{cat}</Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton as={ButtonGroup} size="sm" title={`Rating${rating ? `: ${rating}` : ''}`}>
            {[...Array(6).keys()].map((i) => (
              <Dropdown.Item onSelect={() => setRating(i)}>{i || 'all'}</Dropdown.Item>
            ))}
          </DropdownButton>
        </ButtonGroup>

        <InputGroup>
          <InputGroup.Prepend>
              <InputGroup.Text>{'Price from '}</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="number"
            value={minPrice}
            onChange={(e) => {
              if (e.target.value >= 0) setMinPrice(e.target.value)
            }}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>{'Price to '}</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="number"
            value={maxPrice}
            onChange={(e) => {
              if (e.target.value >= 0) setMaxPrice(e.target.value)
            }}
          />
        </InputGroup>

      </ButtonToolbar>

      <Nav>
        <Nav.Item>
          <Nav.Link onClick={() => setOrderBy('hiPrice')}>Highest price</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setOrderBy('lowPrice')}>Lowest price</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setOrderBy('rating')}>Highest rating</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setOrderBy('time')}>Latest products</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  )
}

export default Filter
