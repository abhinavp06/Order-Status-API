const bcrypt = require("bcrypt")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const Customer = require("../models/customer_model")
const Restaurant = require("../models/restaurant_model")
const Agent= require("../models/deliveryAgent_model")

passport.serializeUser ((user, done) => {
    done(null, user.id)
})

passport.deserializeUser ((id, done) => {
    if(isCustomer(user)){
        Customer.findById(id, (err, customer) => {
            done(err, customer)
        })
    }
    else if(isRestaurant(user)){
        Restaurant.findById(id, (err, restaurant) => {
            done(err, restaurant)
        })
    }
    else{
        Agent.findById(id, (err, agent) => {
            done(err, agent)
        })
    }
})

// CUSTOMER

passport.use('customer-local', new LocalStrategy({ usernameField: "customerEmail"}, (customerEmail, customerPassword, done) => {
    Customer.findOne({ customerEmail: customerEmail }).then(customer => {
        if(!customer){
            return res.json({message: 'Customer does not exist'})
        }
        else {
            bcrypt.compare(customerPassword, customer.customerPassword, (err, isMatch) => {
                if(err){
                    throw err
                }
                if(isMatch) {
                    return done(null, customer)
                }
                else{
                    return done(null, false, {message: 'Password incorrect'})
                }
            })
        }
    }).catch(err => {
        return done(null, false, { message: err})
    })
}))

// RESTAURANT

passport.use('restaurant-local', new LocalStrategy({ usernameField: "restaurantEmail"}, (restaurantEmail, restaurantPassword, done) => {
    Restaurant.findOne({ restaurantEmail: restaurantEmail }).then(restaurant => {
        if(!restaurant){
            return res.json({message: 'Restaurant does not exist'})
        }
        else {
            bcrypt.compare(restaurantPassword, restaurant.restaurantPassword, (err, isMatch) => {
                if(err){
                    throw err
                }
                if(isMatch) {
                    return done(null, restaurant)
                }
                else{
                    return done(null, false, {message: 'Password incorrect'})
                }
            })
        }
    }).catch(err => {
        return done(null, false, { message: err})
    })
}))

// AGENT

passport.use('agent-local', new LocalStrategy({ usernameField: "agentEmail"}, (agentEmail, agentPassword, done) => {
    Agent.findOne({ agentEmail: agentEmail }).then(agent => {
        if(!agent){
            return res.json({message: 'Agent does not exist'})
        }
        else {
            bcrypt.compare(agentPassword, agent.agentPassword, (err, isMatch) => {
                if(err){
                    throw err
                }
                if(isMatch) {
                    return done(null, agent)
                }
                else{
                    return done(null, false, {message: 'Password incorrect'})
                }
            })
        }
    }).catch(err => {
        return done(null, false, { message: err})
    })
}))

module.exports = passport