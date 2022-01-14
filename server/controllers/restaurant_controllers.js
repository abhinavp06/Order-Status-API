const Restaurant = require("../models/restaurant_model")
const RestaurantRating = require("../models/restaurantRating_model")
const Order = require("../models/order_model")
const Dish = require("../models/food_model")
const { restart } = require("nodemon")

// PROFILE - edit
exports.editCustomerProfile = (req,res) => {
    Restaurant.findByIdAndUpdate({_id: req.user._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},  
        function(err,updatedRestaurant){
            if(err)
                return res.json(err)
            else
                return res.status(200).json(`Updated your profile`)
        })
}

// Menu
//remove a dish
exports.RemoveDish = (req,res) => {
    // const index = dishes.indexOf(dish);
    // if (index > -1) {
    // dishes.splice(index, 1);
    // }
    const {dishId} = req.params
    Restaurant.findById({id: req.user._id}, function(err,rest){
        if(err)
            return res.json(err)
        else{
            //remove dish from the restaurant menu
            const index = rest.restaurantMenu.indexOf(dishId)
            if(index > -1){
                rest.restaurantMenu.splice(index, 1)
            }
            //delete the dish from the food collection
            try{
                Dish.findByIdAndDelete(dishId)
                return res.status(200).json(`Dish deleted`)
            }catch(err){
                return res.json(err)
            }
        }
    })
}
//add a dish
exports.AddDish = (req,res) => {

    const {foodName, foodPrice} = req.body

    const newDish = new Dish({foodName, foodPrice, foodRestaurant: req.user._id})

    try{
        newDish.save()
        
        try{
            //add the dish to the restaurant's menu array
            req.user.restaurantMenu.push(newDish)
            res.status(200).json(`Dish added to the menu`)
        }catch(err){
            return res.json(err)
        }
    }catch(err){
        return res.json(err)
    }

}
//edit a dish
exports.editDish = (req,res) => {
    Dish.findByIdAndUpdate({foodRestaurant: req.user._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},  
        function(err,updatedDish){
            if(err)
                return res.json(err)
            else
                return res.status(200).json(`Dish updated!`)
        })
}
// Orders
//see in progress orders
exports.showRestaurantsInProgressOrders = (req,res) => {
    Restaurant.findById({id: req.user._id}, function(err,rest){
        if(err)
            return res.json(err)
        else{
            return res.status(200).json(user.restaurantOrdersInProgress)
        }
    })
}

//see all past orders
exports.showRestaurantsPreviousOrders = (req,res) => {
    Restaurant.findById({id: req.user._id}, function(err,rest){
        if(err)
            return res.json(err)
        else{
            return res.status(200).json(user.restaurantOrders)
        }
    })
}
//change status of order to food being prepared
exports.changeOrderStatusToBeingPrepared = (req,res) => {
    const {orderId} = req.params
    Order.findById({id: orderId}, function(err,ord){
        if(err)
            return res.json(err)
        else{
            ord.orderStatus(`Food is being prepared`)
            return res.json(`Order status updated!`)
        }
    })
}
//change status of order to out for delivery
exports.changeOrderStatusToOutForDelivery = (req,res) => {
    const {orderId} = req.params
    Order.findById({id: orderId}, function(err,ord){
        if(err)
            return res.json(err)
        else{
            ord.orderStatus(`Out for delivery`)
            return res.json(`Order status updated!`)
        }
    })
}