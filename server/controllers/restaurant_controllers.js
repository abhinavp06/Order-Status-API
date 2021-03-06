const Restaurant = require("../models/restaurant_model")
const Order = require("../models/order_model")
const Dish = require("../models/food_model")

// PROFILE - edit
exports.editRestaurantProfile = (req,res) => {
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
            return res.status(200).json(rest.restaurantOrdersInProgress)
        }
    })
}

//see all past orders
exports.showRestaurantsPreviousOrders = (req,res) => {
    Restaurant.findById({id: req.user._id}, function(err,rest){
        if(err)
            return res.json(err)
        else{
            return res.status(200).json(rest.restaurantOrders)
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
    const {orderId, restaurantId} = req.params
    
    //move the order to restaurant's previous orders array
    Restaurant.findById({id: restaurantId}, function(err,rest){
        if(err)
            return res.json(err)
        else{
            const index = rest.restaurantOrdersInProgress.indexOf(orderId);
            if (index > -1) {
                rest.restaurantOrdersInProgress.splice(index, 1);
            }
            rest.restaurantOrders.push(orderId)

            //changing the status of the order
            Order.findById({id: orderId}, function(err,ord){
                if(err)
                    return res.json(err)
                else{
                    ord.orderStatus(`Out for delivery`)
                    return res.json(`Order status updated!`)
                }
            })
        }
    })
}