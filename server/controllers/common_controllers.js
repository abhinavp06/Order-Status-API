const Customer = require("../models/customer_model")
const Restaurant = require("../models/restaurant_model")
const Order = require("../models/order_model")
const Dish = require("../models/food_model")

//get restaurant by id
exports.getRestaurantById = (req,res) => {
    const {restaurantId} = req.params
    if(req,user._id == restaurantId){
        Restaurant.find({id: restaurantId}, {restaurantPassword: 0, restaurantRatingDetails: 0}, function(err,restaurant){
            if(err)
                return res.json(err)
            else
                return res.status(200).json(restaurant)
        })
    }else{
        Restaurant.find({id: restaurantId}, {restaurantEmail: 0, restaurantPhoneNumber: 0, restaurantOrders:0, restaurantOrdersInProgress: 0, restaurantRatingDetails: 0, role: 0, restaurantPassword: 0}, function(err,restaurant){
            if(err)
                return res.json(err)
            else
                return res.status(200).json(restaurant)
        })
    }
}

// get a specific dish by id
exports.getDishById = (req,res) => {
    const {dishId} = req.params
    Dish.find({id: dishId}, {foodRestaurant: 0}, function(err,dish){
        if(err)
            return res.json(err)
        else{
            return res.json(dish)
        }
    })
}

//get all dishes
exports.getAllDishesOfRestaurant = (req,res) => {
    const {restaurantId} = req.params
    Restaurant.findById({id: restaurantId}, {foodRestaurant: 0}, function(err,rest){
        if(err)
            return res.json(err)
        else
            return res.status(200).json(rest.restaurantMenu)
    })
}

//get order by id - can only be accessed by the order creator, restaurant in which the order has been placed and the delivery agent assigned
exports.getOrderById = (req,res) => {
    const {orderId} = req.params
    Order.findById({id: orderId}, function(err,ord){
        if(err)
            return res.json(err)
        else
            return res.status(200).json(ord)
    })
}

//get agent by id
exports.getAgentById = (req,res) => {
    const {agentId} = req.params
    if(req,user._id == agentId){
        Agent.find({id: agentId}, {agentPassword: 0, agentRatingDetails: 0}, function(err,agent){
            if(err)
                return res.json(err)
            else
                return res.status(200).json(agent)
        })
    }else{
        Agent.find({id: agentId}, {agentEmail: 0, agentPhoneNumber: 0, agentOrders:0, agentOrdersInProgress: 0, agentRatingDetails: 0, role: 0, agentPassword: 0}, function(err,agent){
            if(err)
                return res.json(err)
            else
                return res.status(200).json(agent)
        })
    }
}
