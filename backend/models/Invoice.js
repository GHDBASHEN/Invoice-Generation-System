const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true
  },
  issueDate: {
    type: String,
    required: true
  },
  dueDate: {
    type: String
  },
  biller: {
    name: String,
    address: String,
    email: String,
    phone: String
  },
  client: {
    name: String,
    address: String,
    email: String
  },
  items: [{
    description: String,
    quantity: Number,
    unitPrice: Number
  }],
  taxPercentage: {
    type: Number,
    default: 0
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
