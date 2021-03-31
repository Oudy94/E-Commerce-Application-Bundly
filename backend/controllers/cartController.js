import asyncHandler from 'express-async-handler'
// import sgMail from '@sendgrid/mail'
import User from '../models/userModel.js';

// @desc    Create a cart
// @route   POST /api/cart
// @access  Private
export const updateCart = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id)
  currentUser.cartItems = req.body.cartItems
  const savedUser = await currentUser.save()
  // first check - if user's cart is not empty then send email in some time
  if (savedUser.cartItems.length > 0) {
    setTimeout(() => sendMail(req.user._id), 3000)
  } else {
    console.log(`${savedUser.name}'s cart is empty now!`)
  }
  res.status(201).json({
    message: 'Your cart was updated',
    cartItems: savedUser.cartItems,
  })
})

async function sendMail(userId) {
  const user = await User.findById(userId)
  // second check - if after some time user's cart is still not empty - finally send an email
  if (user.cartItems.length > 0) {
    console.log(`Abandoned cart for ${user.email}`)
    console.log(user.cartItems.map((item) => item.name))
  } else {
    console.log(`${user.name}'s cart is empty now!`)
  }
}
