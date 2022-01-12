const Customer = require("../models/customer_model")
const Restaurant = require("../models/restaurant_model")
const Agent = require("../models/deliveryAgent_model")
const passport = require("passport")

// CUSTOMER
exports.signUpCustomer = async(req,res) => {
    
    const {customerName, customerEmail, customerPassword, customerPhoneNumber, customerAddress} = req.body
    const newCustomer = new Customer({customerName, customerEmail, customerPassword, customerPhoneNumber, customerAddress})
    
    try{
        await newCustomer.save()
        res.status(201).json(newCustomer)
    }catch(error){
        res.status(409).json({message: error.message})
    }
}

exports.signInCustomer = async(req,res,next) => {
    
    passport.authenticate("customer-local", function(err, customer, info) {
        if(err) {
            return res.status(400).json({ errors: err})
        }
        if(!customer) {
            return res.status(400).json({errors: "No customer found"})
        }
        req.logIn(customer , function(err){
            if(err){
                return res.status(400).json({ errors: err})
            }
            return res.status(200).json({ success: `Logged in ${customer.customerName}`})
        })
    })(req,res,next)
}

// RESTAURANT
exports.signUpRestaurant = async(req,res) => {

    const {restaurantName, restaurantEmail, restaurantPassword, restaurantPhoneNumber, restaurantAddress} = req.body
    const newRestaurant = new Restaurant({restaurantName, restaurantEmail, restaurantPassword, restaurantPhoneNumber, restaurantAddress})
    
    try{
        await newRestaurant.save()
        res.status(201).json(newRestaurant)
    }catch(error){
        res.status(409).json({message: error.message})
    }

}

exports.signInRestaurant = async(req,res,next) => {

    passport.authenticate("restaurant-local", function(err, restaurant, info) {
        if(err) {
            return res.status(400).json({ errors: err})
        }
        if(!restaurant) {
            return res.status(400).json({errors: "No restaurant found"})
        }
        req.logIn(restaurant , function(err){
            if(err){
                return res.status(400).json({ errors: err})
            }
            return res.status(200).json({ success: `Logged in ${restaurant.restaurantName}`})
        })
    })(req,res,next)
}

// AGENT
exports.signUpAgent = async(req,res) => {

    const {agentName, agentEmail, agentPassword, agentPhoneNumber} = req.body
    const newAgent= new Agent({agentName, agentEmail, agentPassword, agentPhoneNumber})
    
    try{
        await newAgent.save()
        res.status(201).json(newAgent)
    }catch(error){
        res.status(409).json({message: error.message})
    }

}

exports.signInAgent = async (req,res,next) => {
    
    passport.authenticate("agent-local", function(err, agent, info) {
        if(err) {
            return res.status(400).json({ errors: err})
        }
        if(!agent) {
            return res.status(400).json({errors: "No agent found"})
        }
        req.logIn(agent , function(err){
            if(err){
                return res.status(400).json({ errors: err})
            }
            return res.status(200).json({ success: `Logged in ${agent.agentName}`})
        })
    })(req,res,next)
}

// SIGN OUT
exports.signOut = async(req,res) => {
    req.logout()
    return res.status(200).json({ success: 'Logged out successfully'})
}

// CHECK WHO IS LOGGED IN
exports.whoIsLoggedIn = async(req,res) => {
    
    switch(req.user.role){

        case 0: return res.json({message:`Customer ${req.user.customerName} is logged in.`})

        case 1: return res.json({message:`Agent ${req.user.agentName} is logged in.`})
        
        default: return res.json({message:`Restaurant ${req.user.restaurantName} is logged in.`})
    }
}


// MIDDLEWARES
exports.isCustomer = async(req,res,next) => {
    if(req.user.role == 0)
        next()
    else
        return res.json(`You are not a customer.`)
}

exports.isRestaurant = async(req,res, next) => {
    if(req.user.role == 2)
        next()
    else
        return res.json(`You are not a restaurant.`)
}

exports.isAgent = async(req,res,next) => {
    if(req.user.role == 1)
        next()
    else
        return res.json(`You are not a agent.`)
}

exports.isMenuCreator = (req,res,next) => { // while editing the menu, we need to make sure the restaurant logged in is the restaurant which created the menu
    const {restaurantId} = req.params
    if(req.user._id == restaurantId)
        next()
    else{
        return res.json(`You cannot edit other restaurant's menu`)
    }
}

exports.isOrderCreator = (req,res,next) => { // too edit order details we need to make sure the logged in user is the order creator
    const {customerId} = req.params
    if(req.user._id == customertId)
        next()
    else{
        return res.json(`You don't have access to others' orders`)
    }
}
