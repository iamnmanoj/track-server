const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserModel = mongoose.model('user');

routes.post('/signup', async ({ body: { email, password } }, res) => {

    const userObj = new UserModel({ email, password });
    const token = jwt.sign({ userId: userObj._id }, 'MY_SECRET_KEY');

    await userObj.save().catch((e) => {
        return res.status(422).send(e.message);
    });

    res.send({ token });
});

module.exports = routes;
