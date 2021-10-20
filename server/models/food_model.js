const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema(
    {
        foodName: String,
        foodPrice: Number,
        foodRestaurant:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }
    },    
    { timestamps: true }
)


module.exports = mongoose.model("Food", foodSchema)