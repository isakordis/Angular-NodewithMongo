var express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var users = require('../models/userModel');

//localhost:3000/list
router.get('/', (req, res) => {
    users.find((err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log('Error users:' + JSON.stringify(err, undefined, 2));

        }
    });
});

//localhost:3000/list/:id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record:' `${req.params._id}`);
    users.findById(req.params.id, (err, data) => {
        if (!err) { res.send(data); }
        else {
            console.log('Error users:' + JSON.stringify(err, undefined, 2));
        }
    });


});


router.post('/', (req, res) => {
    console.log(req.body.UserClass);
    // var user = new users(req.body);

    var user = new users({

        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
    });
    user.save((err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log('Error:' + JSON.stringify(err, undefined, 2));
        }
    });
});
router.put('/:_id', (req, res) => {    
    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send('no record');
    var usr = {
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
    };
    users.findByIdAndUpdate(req.params._id, { $set: usr }, { new: true }, (err, data) => {
        if (!err) { res.send(data); }
        else { console.log('Hata' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:_id', (req, res) => {
    console.log('Delete controller kısmı');
    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given id : ${req.params._id}`);

    users.findByIdAndRemove(req.params._id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


module.exports = router;