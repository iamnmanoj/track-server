const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const router = require('./track-routes');

const UserModel = mongoose.model('user');

router.use(requireAuth);

routes.post('/signup', async ({ body: { email, password } }, res) => {

    const userObj = new UserModel({ email, password });
    const token = jwt.sign({ userId: userObj._id }, 'MY_SECRET_KEY');

    await userObj.save().catch((e) => {
        return res.status(422).send(e.message);
    });

    res.send({ token });
});

routes.post('/signin', async ({ body: { email, password } }, res) => {
    try {
        if (!email || !password) {
            return res.status(422).send({ error: 'Must provide email and password' });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(422).send({ error: 'Invalid password/email' });
        }

        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send({ token });
    } catch (e) {
        return res.status(422).send({ error: 'Invalid password/email' });
    }
});

module.exports = routes;
