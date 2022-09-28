require('dotenv').config();
const mongoose = require('mongoose');

module.exports.connectDB = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(res => {
            resolve()
            console.log("[OK] DataBase started succesfully!");
        }).catch(err => {
            reject()
            console.log("[ERROR] Error connecting to DataBase!");
            console.log(err);
        })
    })
};