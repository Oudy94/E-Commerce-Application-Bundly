import React from 'react'
import { Card, CardGroup } from 'react-bootstrap'

const BundleCategory = ({ filterCategory }) => {
  const cardStyle = {
    cursor: 'pointer',
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
        
          <Card.Img variant='top' src='images/vegan.jpg' />
        
        <Card.Body>
          
            <Card.Title as='h4' className='bundle-category'>
              Vegan
            </Card.Title>
          
          <Card.Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam!
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        onClick={() => selectCategory('Vegetarian')}
        style={cardStyle}
      >
        <Card.Img variant='top' src='images/roasted-veggies.jpg' />
          <Card.Body>
            <Card.Title as='h4' className='bundle-category'>
              Vegetarian
            </Card.Title>
          <Card.Text>
            Provident similique accusantium nemo autem. Veritatis obcaecati
            tenetur iure eius earum ut molestias architecto voluptate aliquam
            nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat,
            odit.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card
        onClick={() => selectCategory('')}
        style={cardStyle}
      >
        <Card.Img variant='top' src='images/veggie-plate.jpg' />
          <Card.Body>
            <Card.Title as='h4' className='bundle-category'>
              Meat & Veggies
            </Card.Title>
            <Card.Text>
              Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa
              laudantium molestias eos sapiente officiis modi at sunt excepturi
              expedita sint eveniet aliquid culpa officia aut?
            </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  )
}

export default BundleCategory
