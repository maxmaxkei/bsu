const Item = require('../models/ItemModel');
const User = require('../models/UserModel');
const Ticket = require('../models/TicketModel');
const express = require('express')
const router = express.Router()

router.post('/items', (req, res) => {
    const post = new Item({
        Id: req.body.Id,
        Name: req.body.Name,
        Price: req.body.Price,
        Quantity: req.body.Quantity
    })
    post.save((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                success: true,
                message: `Post with ID_${data._id} saved successfully!`
            })
        }
    })
})

router.get('/items', (req, res) => {
    Item.find({}, 'Id Name Price Quantity', (err, items) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ items: items })
        }
    }).sort({ _id: -1 })
})

router.put('/items', (req, res) => {
    Item.findOneAndUpdate({"Id": req.body.Id},
                        {"Quantity": req.body.Quantity},
                        {new: true}, (err, post) => {

        if(err) return console.log(err);
        res.send({item: post})

    })
})

router.delete('/items', (req, res) => {
    Item.findOneAndDelete({"Id": req.body.Id}, (err, post) => {
        if(err) return console.log(err);
        res.send({item: post})
    })
})

router.post('/users', (req, res) => {
    const post = new User({
        Id: req.body.Id,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        MiddleName: req.body.MiddleName,
        Balance: req.body.Balance
    })
    post.save((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                success: true,
                message: `Post with ID_${data._id} saved successfully!`
            })
        }
    })
})

router.get('/users', (req, res) => {
    User.find({}, 'Id FirstName LastName MiddleName Balance', (err, users) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ users: users })
        }
    }).sort({ _id: -1 })
})

router.put('/users', (req, res) => {
  User.findOneAndUpdate({"Id": req.body.Id}, 
                      {"Balance": req.body.Balance},
                      {new: true}, (err, post) => {

      if(err) return console.log(err);
      res.send({item: post})

  })
})

router.post('/tickets', (req, res) => {
    const post = new Ticket({
        name: req.body.name,
        item: req.body.item,
        totalCost: req.body.totalCost,
        quantity: req.body.quantity,
        balance: req.body.balance
    })
    post.save((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({
                success: true,
                message: `Post with ID_${data._id} saved successfully!`
            })
        }
    })
})

router.get('/tickets', (req, res) => {
    Ticket.find({}, 'name item quantity totalCost balance', (err, item) => {
        if (err) {
            res.sendStatus(500)
        } else {
            res.send({ item: item })
        }
    })
})

router.delete('/tickets', (req, res) => {
    Ticket.findOneAndDelete({"item": req.body.item}, (err, post) => {
        if(err) return console.log(err);
        res.send({item: post})
    })
})

module.exports = router