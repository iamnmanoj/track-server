const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    timeStamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
});

const trackScema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        default: ''
    },
    locations: [pointSchema]
});

mongoose.model('track', trackScema);