const Customer = require("../models/customer_model")
const Order = require("../models/restaurant_model")
const RestaurantRating = require("../models/restaurantRating_model")
const Restaurant = require("../models/restaurant_model")
const Agent = require("../models/deliveryAgent_model")
const AgentRating = require("../models/agentRating_model")

// PROFILE - edit
exports.editCustomerProfile = (req,res) => {
    Customer.findByIdAndUpdate({_id: req.user._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},  
        function(err,updatedCustomer){
            if(err)
                return res.json(err)
            else
                return res.status(200).json(`Updated your profile`)
        })
}

// ORDERS
// create new order
exports.createNewOrder = (req,res) => {
    const {restaurantId} = req.params
    const newOrder = new Order();
    newOrder.orderRestaurant = Restaurant.findById(restaurantId)
    
}
// see previous orders
exports.showCustomersPreviousOrders = (req,res) => {
    Customer.findById({id: req.user._id}, function(err,user){
        if(err)
            return res.json(err)
        else{
            return res.status(200).json(user.customerOrders)
        }
    })
}
// see in progress orders
exports.showCustomersInProgressOrders = (req,res) => {
    Customer.findById({id: req.user._id}, function(err,user){
        if(err)
            return res.json(err)
        else{
            return res.status(200).json(user.customerOrdersInProgress)
        }
    })
}

// RATINGS

// RESTAURANT
// rate a restaurant
exports.RateRestaurant = (req,res) => {
    const {restaurantId} = req.params

    // storing the rating from the body in a variable
    const rating = req.body.restaurantRatingNumber

    // creating a new rating
    const newRating = new RestaurantRating({
        restaurantRated: restaurantId,
        restaurantRatedBy: req.user._id,
        restaurantRatingNumber: rating
    })

    newRating.save()

    // find restaurant and update it's rating
    Restaurant.findById(restaurantId, function(err,rest){
        if(err)
            return res.json(err)
        else{
            //get the restaurant's total rating, add the new rating and update the value
            rest.restaurantRating = ((rest.restaurantRating + rating)/(restaurantRatingDetails.count() + 1))
            //add the new rating to the restaurantRatingDetails array
            rest.restaurantRatingDetails.push(newRating)

            //add the new rating to customer's ratings array
            Customer.findById(req.user._id, function(err,user){
                if(err)
                    return res.json(err)
                else{
                    user.customerRestaurantRating.pus(newRating)
                    return res.status(200).json(`Restaurant rated!`)
                }
            })
        }
    })
}
// edit restaurant rating
exports.editRestaurantRating = (req,res) => {
    const {restaurantId, restaurantRatingId} = req.params
    // find the rating, update the value
    const newRatingValue = req.body.restaurantRatingNumber
    var oldRatingTemp = 0 // stores the old rating value
    RestaurantRating.findById(restaurantRatingId, function(err,ra){
        if(err)
            return res.json(err)
        else{
            oldRatingTemp = ra.restaurantRatingNumber
            ra.restaurantRatingNumber = newRatingValue
            ra.save()
            //update the restaurant's total rating
            Restaurant.findById(restaurantId, function(err,rest){
                if(err)
                    return res.json(err)
                else{
                    rest.restaurantRating = ((res.restaurantRating - oldRatingTemp + newRatingValue)/rest.restaurantRatingDetails.count())
                    return res.status(200).json(`Restaurant rating updated!`)
                }
            })
        }
    })

    
}

// AGENT
// rate an agent
exports.RateAgent = (req,res) => {
    const {agentId} = req.params

    // storing the rating from the body in a variable
    const rating = req.body.agentRatingNumber

    // creating a new rating
    const newRating = new AgentRating({
        agentRated: agentId,
        agentRatedBy: req.user._id,
        agentRatingNumber: rating
    })

    newRating.save()

    // find agent and update their rating
    Agent.findById(agentId, function(err,agent){
        if(err)
            return res.json(err)
        else{
            //get the agent's total rating, add the new rating and update the value
            agent.agentRating = ((agent.agentRating + rating)/(agentRatingDetails.count() + 1))
            //add the new rating to the agentRatingDetails array
            agent.agentRatingDetails.push(newRating)

            //add the new rating to customer's ratings array
            Customer.findById(req.user._id, function(err,user){
                if(err)
                    return res.json(err)
                else{
                    user.customerAgentRating.pus(newRating)
                    return res.status(200).json(`Agent rated!`)
                }
            })
        }
    })
}
// edit agent rating
exports.editAgentRating = (req,res) => {
    const {agentId, agentRatingId} = req.params
    // find the rating, update the value
    const newRatingValue = req.body.agentRatingNumber
    var oldRatingTemp = 0 // stores the old rating value
    AgentRating.findById(agentRatingId, function(err,agr){
        if(err)
            return res.json(err)
        else{
            oldRatingTemp = ag.agentRatingNumber
            agr.agentRatingNumber = newRatingValue
            agr.save()
            //update the agent's total rating
            Agent.findById(agentId, function(err,ag){
                if(err)
                    return res.json(err)
                else{
                    ag.agentRating = ((ag.agenttRating - oldRatingTemp + newRatingValue)/ag.agentRatingDetails.count())
                    return res.status(200).json(`Agent rating updated!`)
                }
            })
        }
    })

    
}

