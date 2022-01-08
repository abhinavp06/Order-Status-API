const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        orderRestaurant:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        },
        // As of now, storing same items seprately in the order. Not grouping them together and adding a quantity field.
        // orderItems:[{
        //     orderFood:{
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Food'
        //     },
        //     quantity: Number
        // }],
        orderItems:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
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