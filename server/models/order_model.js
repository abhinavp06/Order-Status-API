const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        orderRestaurant:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        },
        orderItems:[{
            orderFood:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food'
            },
            quantity: Number
        }],
        orderAmount: Number,
        orderStatus: String,
        orderAgent:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Agent'
        },
        orderCustomer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        }
    },    
    { timestamps: true }
)


module.exports = mongoose.model("Order", orderSchema)