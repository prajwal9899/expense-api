const model = require('../modules/module')

async function create_categories(req, res) {
    const Create = new model.Categories({
        type: "Savings",
        color: "#FCBE44"
    })

    await Create.save((err) => {
        if (!err) {
            return res.json(Create)
        }

        return res.status(400).json({ message: err })
    })
}

async function get_categories(req, res) {
    let data = await model.Categories.find({})

    let filter_data = await data.map(v => Object.assign({}, { type: v.type, color: v.color }))

    return res.json(filter_data)
}

async function create_transactions(req, res) {

    if (!req.body) return res.status(400).json("Post HTTP request not found")

    let { name, type, amount } = req.body

    const Create = new model.Transactions({
        name,
        type,
        amount,
        date: new Date()
    })


    await Create.save((err) => {
        if (!err) {
            return res.json(Create)
        }
        return res.status(400).json({ message: err })
    })

    console.log(name, type, amount);
}

async function get_transactions(req, res) {
    let data = await model.Transactions.find({})

    let filter_data = await data.map(v => Object.assign({}, { name: v.name, type: v.type, amount: v.amount, date: v.date }))

    return res.json(filter_data)

}

async function delete_transactions(req, res) {

    if (!req.body) res.status(400).json('Request body not found')

    await model.Transactions.deleteOne(req.body, (err) => {
        if (!err) res.json("Record deleted")
    }).clone().catch((err) => {
        res.json(err)
    })

}

async function get_labels(req, res) {

    model.Transactions.aggregate([
        {
            $lookup: {
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, { _id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color'] }))
        res.json(data)
    }).catch(err => {
        res.status(400).json(err)
    })




}

module.exports = {
    create_categories,
    get_categories,
    create_transactions,
    get_transactions,
    delete_transactions,
    get_labels

}