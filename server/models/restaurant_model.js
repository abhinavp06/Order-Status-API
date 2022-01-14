const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const restaurantSchema = new mongoose.Schema(
    {
        restaurantName:{
            type: String,
            required: true,
            min: 1,
            unique: true
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
        // the order in progress is an array created where new orders are first kep. When the orders have been prepared and delivered, the order moves to the restaurantOrders array.
        restaurantOrdersInProgress:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],
        restaurantRating:{
            type: Number,
            default: 0
        },
        restaurantRatingsReceived:{
            type: Number,
            defailt: 0
        },
        // storing the users who rate the restaurant. This array is not accessible by anyone. Incase, the user wants to change their rating, we find it in this array and change the rating. Then the total is again calculated.
        restaurantRatingDetails:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RestaurantRating'
        }],
        restaurantMenu:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food'
        }],
        role:{
            type: Number,
            value: 2
        }
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