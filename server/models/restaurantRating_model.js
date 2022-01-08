const mongoose = require("mongoose")

const restaurantRatingSchema = new mongoose.Schema(
    {
        restaurantRated:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant'
        },
        restaurantRatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        restaurantRatingNumber: Number
    }
)


module.exports = mongoose.model("RestaurantRating", restaurantRatingSchema)