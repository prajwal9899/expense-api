const express = require("express")
const app = express()
const cors = require('cors')
const dotenv= require('dotenv')
const port = process.env.PORT || 5000
const conn = require('./db/connection')

dotenv.config()

// use it before all route definitions
app.use(cors())

// mongodb connection
conn.then((db) => {
    if (!db) return process.exit(1)
    app.listen(port, () => {
        console.log(`listening on the port ${port}`);
    })
    app.on('error', err => console.log('Failed to connect'));
}).catch((err) => {
    console.log(err);
})

// use middlewares

app.use(express.json())


// heroku setup

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./client/build'))
}

// using routes
app.use(require("./routes/route"))
