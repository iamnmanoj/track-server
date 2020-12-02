require('./models/user');
require('./middlewares/requireAuth');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

const connectionString = 'mongodb+srv://manoj888hero:manoj888hero@cluster0.e4k2h.mongodb.net/Track-Server?retryWrites=true&w=majority'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongoose instance');
})

mongoose.connection.on('error', (e) => {
    console.log('Error connecting to mongoose', e);
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email:${req.user.email}`);
});

app.listen('3000', () => {
    console.log('Listening on Port 3000');
});