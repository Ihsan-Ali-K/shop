const mongoose = require('mongoose');
const mongoURI ="mongodb://127.0.0.1:27017/shop"

const connectTOMongo =() =>{
    mongoose.connect(mongoURI)
    console.log("connected to database success")
}

module.exports = connectTOMongo;