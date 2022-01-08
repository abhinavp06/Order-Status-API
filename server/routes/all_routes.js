const express = require("express")
const { signUpCustomer, signUpRestaurant, signUpAgent, signInCustomer, signInRestaurant, signInAgent, signOut, whoIsLoggedIn } = require("../controllers/auth_controllers")

const router = express.Router()

//  SIGN UP
router.post('/signup/customer', signUpCustomer)
router.post('/signup/restaurant', signUpRestaurant)
router.post('/signup/agent', signUpAgent)

// SIGN IN
router.post('/signin/customer', signInCustomer)
router.post('/signin/restaurant', signInRestaurant)
router.post('/signin/agent', signInAgent)

// SIGN OUT
router.post('/signout', signOut)

// Checking who is logged in
router.post('/', whoIsLoggedIn)

module.exports = router