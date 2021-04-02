import React, { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  Container,
  Navbar,
  Row,
} from 'react-bootstrap'

const FAQScreen = ({ history }) => {
  const [openA, setOpenA] = useState(false)
  const [openB, setOpenB] = useState(false)
  const [openC, setOpenC] = useState(false)

  return (
    <>
      <Button
        className='btn btn-light my-3'
        onClick={() => {
          history.goBack()
        }}
      >
        Go Back
      </Button>
      <Navbar className='faq rounded' variant='light' expand='lg'>
        <h1>
          <Badge className='faqb'>Frequently Asked Questions</Badge>
        </h1>
      </Navbar>

      <Container>
        <Card className='shadow p-1 my-4'>
          <Row
            className='btn-outline-success rounded justify-content-between'
            onClick={() => setOpenA(!openA)}
            aria-controls='example-collapse-one'
            aria-expanded={openA}
          >
            <Col md={10}>
              <h2>
                <strong>
                  What’s the benefit of an FAQ section on your website?
                </strong>
              </h2>
            </Col>
            {!openA ? (
              <Col md={1}>
                <i className='fas fa-arrow-down'></i>
              </Col>
            ) : (
              <Col md={1}>
                <i className='fas fa-arrow-up'></i>
              </Col>
            )}
          </Row>
          <Collapse in={openA}>
            <div id='example-collapse-one'>
              <strong>It saves you time.</strong> If you spend a lot of your
              time answering emails or social media queries, an FAQ can be a
              real timesaver. <hr />
              <strong>
                It can also help prevent costly and time-consuming returns in
                your online store.{' '}
              </strong>
              It brings new website traffic and new customers. Google’s goal is
              to deliver answers to questions. If you put your text in a Q&A
              format, you’re doing half the work already. Even better, if you
              have a good answer to a question, you might get featured in one of
              Google’s answer boxes or feature snippets, which will give you a
              big traffic boost. <hr />
              <strong>It builds trust and shows that you get it:</strong> A
              well-written FAQ page shows experience. You know what customers
              are thinking and you’ve already got an answer. It’s a great way to
              increase the trust and professionalism of your website.
              <hr />
              <hr />
              <h2>
                Has this answer helped you?{' '}
                <Button variant='light'>
                  <span role='img' aria-label='example-collapse-one'>
                    &#128077;
                  </span>
                </Button>
                <Button variant='light'>
                  <span role='img' aria-label='example-collapse-one'>
                    &#128078;
                  </span>
                </Button>
              </h2>
            </div>
          </Collapse>
        </Card>
        <Card className='shadow p-1 mb-4'>
          <Row
            className='btn-outline-success rounded justify-content-between'
            onClick={() => setOpenB(!openB)}
            aria-controls='example-collapse-two'
            aria-expanded={openB}
          >
            <Col md={10}>
              <h2>
                <strong>
                  How do you decide what questions to put in your FAQ?
                </strong>
              </h2>
            </Col>
            {!openB ? (
              <Col md={1}>
                <i className='fas fa-arrow-down'></i>
              </Col>
            ) : (
              <Col md={1}>
                <i className='fas fa-arrow-up'></i>
              </Col>
            )}
          </Row>
          <Collapse in={openB}>
            <div id='example-collapse-two'>
              <strong>Look at your customers’ questions</strong> The first is
              pretty obvious: What do your customers ask you? Look at your email
              inbox or social media account and see which questions keep popping
              up. What usually makes people hesitate before purchasing? What
              doubts might they have? The more you can automate the answers to
              these questions, these easier you’ll make it for your customers to
              buy with confidence. And you’ll save yourself time too.
              <hr />
              <strong> Look at your competitors’ websites</strong> If you’re a
              new business or don’t have a lot of customer queries yet, take a
              look at similar websites for ideas. Bonus points if you can answer
              the question better than they can.
              <hr />
              <hr />
              <h2>
                Has this answer helped you?{' '}
                <Button variant='light'>
                  <span role='img' aria-label='example-collapse-two'>
                    &#128077;
                  </span>
                </Button>
                <Button variant='light'>
                  <span role='img' aria-label='example-collapse-two'>
                    &#128078;
                  </span>
                </Button>
              </h2>
            </div>
          </Collapse>
        </Card>
        <Card className='shadow p-1 mb-4 '>
          <Row
            className='btn-outline-success rounded justify-content-between'
            onClick={() => setOpenC(!openC)}
            aria-controls='example-collapse-three'
            aria-expanded={openC}
          >
            <Col md={10}>
              <h2>
                <strong> Why you should make an FAQ page three?</strong>
              </h2>
            </Col>
            {!openC ? (
              <Col md={1}>
                <i className='fas fa-arrow-down'></i>
              </Col>
            ) : (
              <Col md={1}>
                <i className='fas fa-arrow-up'></i>
              </Col>
            )}
          </Row>
          <Collapse in={openC}>
            <div id='example-collapse-three'>
              The best FAQ pages do a lot of the heavy lifting on your website.
              They’re one of the easiest ways to acquire new customers, close
              sales, and save time answering repetitive questions.
              <hr /> But lots of people forget to add a list of commonly asked
              questions to their websites. No more! Read on for tips on how to
              write an FAQ section and some of the reasons why it will help your
              business!
              <hr />
              <hr />
              <h2>
                Has this answer helped you?{' '}
                <Button variant='light'>
                  <span role='img' aria-label='example-collapse-three'>
                    &#128077;
                  </span>
                </Button>
                <Button variant='light'>
                  <span role='img' aria-label='example-collapse-three'>
                    &#128078;
                  </span>
                </Button>
              </h2>
            </div>
          </Collapse>
        </Card>
      </Container>
    </>
  )
}

export default FAQScreen
