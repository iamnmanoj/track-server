require('./models/user');
require('./models/track');
require('./middlewares/requireAuth');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/track-routes');
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
// app.use(requireAuth);
app.use(authRoutes);
app.use(trackRoutes);

mongoose.connection.on('connected', () => {
    console.log('Connected to mongoose instance');
})

mongoose.connection.on('error', (e) => {
    console.log('Error connecting to mongoose', e);
})

app.get('/', (req, res) => {
    res.send(`Your email:${req.user.email}`);
});

app.listen('3000', () => {
    console.log('Listening on Port 3000');
});