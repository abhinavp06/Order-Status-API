const mongoose = require("mongoose")

const agentRatingSchema = new mongoose.Schema(
    {
        agentRated:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Agent'
        },
        agentRatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer'
        },
        agentRatingNumber: Number
    }
)


module.exports = mongoose.model("AgentRating", agentRatingSchema)