const mongoose = require('mongoose')

const conn = mongoose.connect('mongodb+srv://prajwal:prajwal9899@cluster0.j6od0.mongodb.net/?retryWrites=true&w=majority')
.then((db) => {
    console.log('Database connected successfully');
    return db
}).catch((error) =>{
    console.log(error);
})

module.exports = conn

