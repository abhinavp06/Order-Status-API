const Agent = require("../models/deliveryAgent_model")
const Order = require("../models/order_model")

// PROFILE - edit
exports.editAgentProfile = (req,res) => {
    Agent.findByIdAndUpdate({_id: req.user._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},  
        function(err,updatedAgent){
            if(err)
                return res.json(err)
            else
                return res.status(200).json(`Updated your profile`)
        })
}

// Orders
// see in progress orders
exports.showAgentsInProgressOrders = (req,res) => {
    Agent.findById({id: req.user._id}, function(err,agent){
        if(err)
            return res.json(err)
        else{
            return res.status(200).json(agent.agentOrdersInProgress)
        }
    })
}
// see previous orders
exports.showAgentsPreviousOrders = (req,res) => {
    Agent.findById({id: req.user._id}, function(err,agent){
        if(err)
            return res.json(err)
        else{
            return res.status(200).json(agent.agentOrders)
        }
    })
}
// mark order as delivered
exports.changeOrderStatusToDelivered = (req,res) => {
    const {orderId} = req.params
    Order.findById({id: orderId}, function(err,ord){
        if(err)
            return res.json(err)
        else{
            ord.orderStatus(`Delivered`)
            return res.json(`Order status updated!`)
        }
    })
}
