const express = require("express")
const { signUpCustomer, signUpRestaurant, signUpAgent } = require("../controllers/auth_controllers")

const router = express.Router()

//  SIGN UP
router.post('/signup/customer', signUpCustomer)
router.post('/signup/restaurant', signUpRestaurant)
router.post('/signup/agent', signUpAgent)

module.exports = router