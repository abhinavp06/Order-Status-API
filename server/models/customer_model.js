const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const customerSchema = new mongoose.Schema(
    {
        customerName:{
            type: String,
            required: true,
            unique: false
        },
        customerEmail:{
            type: String,
            required: true,
            unique: true
        },
        customerPassword:{
            type: String,
            required: true
        },
        customerAddress:{
            type: String,
            min:8
        },
        customerPhoneNumber:{
            type: String,
            min:10,
            max: 10,
            required: true,
            unique: true
        },
        customerOrders:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],
        customerOrdersInProgress:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],
        customersRestaurantRatings:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RestaurantRating'
        }],
        customersAgentRatings:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AgentRating'
        }],
        role:{
            type: Number,
            value: 0
        }
    },
    { timestamps: true }
)


customerSchema.pre('save', async function (next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.customerPassword, salt)
        this.customerPassword = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

module.exports = mongoose.model("Customer", customerSchema)