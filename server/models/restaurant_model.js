const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const restaurantSchema = new mongoose.Schema(
    {
        restaurantName:{
            type: String,
            required: true,
            min: 1,
            unique: false
        },
        restaurantEmail:{
            type: String,
            required: true,
            unique: true
        },
        restaurantPassword:{
            type: String,
            required: true
        },
        restaurantAddress:{
            type: String,
            min:8
        },
        restaurantPhoneNumber:{
            type: String,
            max: 10,
            required: true,
            unique: true
        },
        restaurantOrders:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],
        restaurantRating:{
            type: Number,
            default: 0
        },
        restaurantRatingsReceived: {
            type: Number,
            default: 0
        },
        restaurantFood:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        }],
        role: 2
    },
    { timestamps: true }
)


restaurantSchema.pre('save', async function (next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.restaurantPassword, salt)
        this.restaurantPassword = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

module.exports = mongoose.model("Restaurant", restaurantSchema)