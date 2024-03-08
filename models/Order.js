import mongoose from "mongoose";

const schema = new mongoose.Schema({


  orderItems: {
    laptop: {
      price: {
        type: Number,
        required: true,
      }
    },

    Camera: {
      price: {
        type: Number,
        required: true,
      }
    },

  },

  
  paymentInfo: {
    
    type: mongoose.Schema.ObjectId,
        // ↓↓↓ hear you  go Payment.js schema  for reference
    ref: "Payment",
  },
  paidAt: Date,

  itemsPrice: {
    type: Number,
    default: 0,
  },
  



});

export const Order = mongoose.model("Order", schema);
