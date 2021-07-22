const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userModel = new Schema({
    id_user: Number,
    fisrtName: String,
    userName: String,
    authCode: Number,
    timeDay: Number,
    timeWeek: Number,
    timeMonth: Number,
    dataAuth: Date
});

module.exports.userModel = mongoose.model("trackUser", userModel);