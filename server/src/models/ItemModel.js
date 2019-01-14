const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  Id: {
    type: Number
  },
  Name: {
    type: String
  },
  Price: {
  	type: Number
  },
  Quantity: {
  	type: Number
  }
});

const ItemModel = mongoose.model("items", ItemSchema);

module.exports = ItemModel;