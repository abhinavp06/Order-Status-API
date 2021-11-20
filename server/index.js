require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
const session = require('express-session')
const passport = require('./passport/passport')

// IMPORTING ROUTES
const authRoutes = require("./routes/auth_routes")

mongoose.connect(process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(console.log(`MONGODB CONNECTED`));

const app = express()

app.use(morgan('common'))
app.use(cors())
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req,res) => {
    res.json("🎂")
})

app.use("/", authRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})