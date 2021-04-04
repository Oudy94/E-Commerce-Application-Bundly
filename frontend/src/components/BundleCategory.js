import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'

const BundleCategory = ({ filterCategory }) => {
  const cardStyle = {
    cursor: 'pointer',
    margin: 5
  }
  const selectCategory = (category) => {
    filterCategory(category)
    document.getElementById('bundle-search-form').scrollIntoView({
      behavior: 'smooth',
    })
  }
  return (
    <CardGroup>
      <Card
        className='card-bundle-category'
        onClick={() => selectCategory('Vegan')}
        style={cardStyle}
      >
        <Card.Img variant='top' src='/images/vegan.jpg' /> 
        <Card.Body>
          <Card.Title as='h4' className='bundle-category'>
            Vegan
          </Card.Title>
          <Card.Text>
            Ingredients are 100% plant-based and colorfully nutrient-filled. Select from this category if you want a healthy surprise each week.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card
        onClick={() => selectCategory('Vegetarian')}
        style={cardStyle}
      >
        <Card.Img variant='top' src='/images/roasted-veggies.jpg' />
        <Card.Body>
          <Card.Title as='h4' className='bundle-category'>
              Vegetarian
          </Card.Title>
          <Card.Text>
            Anyone looking to incorporate more plants into their diet will love this ultra-simple vegetarian food subscription.
          </Card.Text>
        </Card.Body>
      </Card>

      <Card
        onClick={() => selectCategory('')}
        style={cardStyle}
      >
        <Card.Img variant='top' src='/images/veggie-plate.jpg' />
        <Card.Body>
          <Card.Title as='h4' className='bundle-category'>
            Meat & Veggies
          </Card.Title>
          <Card.Text>
            These prepared bundles are setting you up with quick lunches or dinners that you can count on being high-quality and filled with flavor and have a healthful focus!
          </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  )
}

export default BundleCategory
