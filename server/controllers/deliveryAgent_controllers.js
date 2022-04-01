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
    const {orderId, customerId} = req.params
    
    // move the order to previous order array of customer and agent
    Agent.findById({id:req.user._id}, function(err,agent){
        if(err)
            return res.json(err)
        else{
            //changing the order status
            Order.findById({id: orderId}, function(err,ord){
                if(err)
                    return res.json(err)
                else{
                    ord.orderStatus(`Delivered`)
                    //removing the order from agent's in progress order array
                    const index = agent.agentOrdersInProgress.indexOf(orderId);
                    if (index > -1) {
                        agent.agentOrdersInProgress.splice(index, 1);
                    }
                    //pushing the order to the agent's previous order array
                    agent.agentOrders.push(orderId)

                    //finding the customer
                    Customer.findById({id: customerId}, function(err,cust){
                        if(err)
                            return res.json(err)
                        else{
                            //removing the order from the customer's in progress order array
                            const index = cust.customerOrdersInProgress.indexOf(orderId);
                            if (index > -1) {
                                cust.customerOrdersInProgress.splice(index, 1);
                            }
                            //adding the order to customer's previous order array
                            return res.json(`Order status updated!`)
                        }
                    })
                }
            })
        }
    })
}
