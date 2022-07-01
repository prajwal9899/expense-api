const mongoose = require('mongoose')

const CategoriesSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "Investment"
    },
    color: {
        type: String,
        default: '#FCBE44'
    }

})

const TransactionsSchema = mongoose.Schema({
    name: {
        type: String,
        default: "Anonymous"
    },
    type: {
        type: String,
        default: "Anonymous"
    },
    amount: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Categories = mongoose.model('categories',CategoriesSchema)
const Transactions = mongoose.model('transactions', TransactionsSchema)

module.exports = {
    Categories,
    Transactions
}