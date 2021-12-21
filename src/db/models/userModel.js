const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const userModel = new Schema({
    id_user: Number,
    fisrtName: String,
    userName: String,
    authCode: Number,
    isWorking: Boolean,
    isPause: Boolean,
    timeDay: Number,
    timeWeek: Number,
    timeMonth: Number,
    timer: Object,
    dataAuth: Date
});

module.exports.userModel = mongoose.model("trackUser", userModel);