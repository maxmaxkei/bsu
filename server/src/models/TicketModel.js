const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    name: {
        type: String
    },
    item: {
        type: String
    },
    totalCost: {
        type: Number
    },
    quantity: {
        type: Number
    },
    balance: {
        type: Number
    }
});

const TicketModel = mongoose.model("tickets", TicketSchema);

module.exports = TicketModel;