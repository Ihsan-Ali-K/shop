const mongoose = require('mongoose');

const {Schema} = mongoose;

const OrderSchema = new Schema({

    userId: {
        type : mongoose.Schema.Types.ObjectId ,
        ref: 'user',
        required: true,
    },
    order_data: {
      type: Array,
      required: true
    },
    total_price: {
      type: Number,
      required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });

  module.exports = mongoose.model('order', OrderSchema);