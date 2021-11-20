const Customer = require("../models/customer_model")
const Restaurant = require("../models/restaurant_model")
const Agent = require("../models/deliveryAgent_model")
const mongoose = require("mongoose")
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

}

exports.isCustomer = async(req,res,next) => {
    if(req.user.role == 0){
        return true
    }else{
        return false
    }
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

}

exports.isRestaurant = async(req,res, next) => {
    
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

}

exports.isAgent = async(req,res,next) => {
    
}

// COMMON
exports.whoIsLoggedIn = async(req,res) => {

}

exports.isAuthenticated = async(req,res,next) =>{

}

exports.signOut = async(req,res) => {

}


