const express = require('express')
const mongoose = require('mongoose')
const customer = require('./model/model')
const cors = require('cors')
require('dotenv').config()
require('./db/connect')
const app = express()
app.use(cors())

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))



app.get('/api/allcustomer', async (req, res) => { //get all customer data
    await customer.find({}, (err, result) => {
        if (err) {
            res.status(400).send(err)
        }
        if (result) {
            res.status(200).send({
                status: 200,
                developer: 'Bhaskar Biswas',
                data: result
            })
        }

    })
})
app.post('/api/customer', async (req, res) => { //One customer data get
    var id = req.body.id
    await customer.find({
        _id: id
    }, (err, result) => {
        if (err) {
            res.status(400).send(err)
        }
        if (result) {
            res.status(200).send({
                status: 200,
                developer: 'Bhaskar Biswas',
                data: result
            })
        }
    })
})
app.post('/api/sendmoney', async (req, res) => { //send money to other customer
    var id = req.body.id
    var money = req.body.money
    await customer.updateOne({
        _id: id
    }, {
        balance: money
    }, (err, result) => {
        if (err) return res.status(400).send({
            status: 400,
            message: err.message
        })
        res.status(200).send({
            status: 200,
            message: 'Successfully Update Credential',
            data: result
        })
    })

})
// app.post('/api/addcustomer', async (req, res) => {
//     try {
//         var name = req.body.name;
//         var email = req.body.email;
//         var balance = req.body.balance
//         var customerDetails = {
//             name: name,
//             email: email,
//             balance: balance
//         }

//         const customerData = await new customer(customerDetails)
//         var registerStatus = await customerData.save();
//         res.status(200).send({
//             status: 200,
//             message: "You have successfully Add New customer!",
//             data: registerStatus
//         })
//     } catch (err) {
//         res.status(404).send('some error happen' + err);
//     }
// })

app.listen(PORT, () => console.log(`Server Started at: http://localhost:${PORT}`))