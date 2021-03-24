import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const faqScreen = ({ history }) => {
  const faqs = [
    {
      question: 'How many programmers does it take to screw in a lightbulb?',
      answer: "None. We don't address hardware issues.",
      open: true,
    },
    {
      question: 'Who is the most awesome person?',
      answer: 'You. The Viewer.',
      open: false,
    },
    {
      question:
        'How many questions does it take to make a successful FAQ Page?',
      answer: 'This many.',
      open: false,
    },
  ]

  const toggleFAQ = (index) => {
    faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false
      }

      return faq
    })
  }

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
      <h1>FAQs Page</h1>
      {faqs.map((faq, index) => (
        <div
          className={'faq ' + (faq.open ? 'open' : '')}
          key={index}
          onClick={() => toggleFAQ(index)}
        >
          <div className='faq-question'>{faq.question}</div>
          <div className='faq-answer'>{faq.answer}</div>
        </div>
      ))}
    </>
  )
}

export default faqScreen
