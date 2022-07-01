const express = require("express")
const routes = express.Router()
const controller = require('../controller/controller')


routes.get('/',(req,res) => {
    resizeBy.send("welcome to expense-api")
})

// Category  Routes
routes.get('/api/categories',controller.get_categories)
routes.post('/api/categories', controller.create_categories)

// Transaction Routes
routes.get('/api/transactions', controller.get_transactions)
routes.post('/api/transactions', controller.create_transactions)
routes.delete('/api/transactions', controller.delete_transactions)

// Labels routes
routes.get('/api/labels', controller.get_labels)



module.exports = routes