const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ipSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        ip: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    }
);

const Ip = mongoose.model('Ip', ipSchema);

module.exports = Ip;