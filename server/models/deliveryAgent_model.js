const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const agentSchema = new mongoose.Schema(
    {
        agentName:{
            type: String,
            required: true,
            min: 1,
            unique: false
        },
        agentEmail:{
            type: String,
            required: true,
            unique: true
        },
        agentPassword:{
            type: String,
            required: true
        },
        agentPhoneNumber:{
            type: String,
            max: 10,
            required: true,
            unique: true
        },
        agentOrders:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],
        agentRating:{
            type: Number,
            default: 0
        },
        agentRatingsReceived: {
            type: Number,
            default: 0
        },
        role:{
            type: Number,
            value: 1
        }
    },
    { timestamps: true }
)


agentSchema.pre('save', async function (next){
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.agentPassword, salt)
        this.agentPassword = hashedPassword
        next()
    }catch(error){
        next(error)
    }
})

module.exports = mongoose.model("Agent", agentSchema)