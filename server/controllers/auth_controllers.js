const Customer = require("../models/customer_model")
const Restaurant = require("../models/restaurant_model")
const Agent = require("../models/deliveryAgent_model")
const passport = require("passport")

// CUSTOMER

exports.signUpCustomer = async(req,res) => {
    
    const {customerName, customerEmail, customerPassword, customerPhoneNumber} = req.body
    const newCustomer = new Customer({customerName, customerEmail, customerPassword, customerPhoneNumber})
    
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

exports.isCustomer = async(req,res,next) => {
    return (req.user.role == 0) ? true : false
}

// RESTAURANT

exports.signUpRestaurant = async(req,res) => {

    const {restaurantName, restaurantEmail, restaurantPassword, restaurantPhoneNumber} = req.body
    const newRestaurant = new Restaurant({restaurantName, restaurantEmail, restaurantPassword, restaurantPhoneNumber})
    
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

exports.isRestaurant = async(req,res, next) => {
    return (req.user.role == 2) ? true : false  
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

exports.isAgent = async(req,res,next) => {
    return (req.user.role == 1) ? true : false 
}

// COMMON
exports.whoIsLoggedIn = async(req,res) => {
    
    switch(req.user.role){

        case 0: return res.json({message:`Customer ${req.user.customerName} is logged in.`})

        case 1: return res.json({message:`Agent ${req.user.agentName} is logged in.`})
        
        default: return res.json({message:`Restaurant ${req.user.restaurantName} is logged in.`})
    }
}

exports.isAuthenticated = async(req,res,next) =>{
    
    const {id} =req.params; 
    if(req.user._id == id){
        next();
    }else{
        res.json(`You are not allowed to edit other's profiles`)
    }
}

exports.signOut = async(req,res) => {
    req.logout()
    return res.status(200).json({ success: 'Logged out successfully'})
}


