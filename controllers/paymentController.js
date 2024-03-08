import { instance } from "../server.js";
import crypto from "crypto";
import { Payment } from "../models/paymentModel.js";
// import { Order } from "../models/Order.js"

export const checkout = async (req, res) => {

  // const orderOptions = {
  //   // shippingInfo,
  //   orderItems,
  //   // paymentMethod,
  //   itemsPrice,
  //   // taxPrice,
  //   // shippingCharges,
  //   // totalAmount,
  //   // user,
  // };





  // const {
  
  //   orderItems,
   
  //   itemsPrice,
   
  // } = req.body;

  // // const user = req.user._id;// ! for the API testing on postman --> const user = "req.user._id";

  // const orderOptions = {
  
  //   orderItems,
 
  //   itemsPrice,
    
  
  // };





  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);




  res.status(200).json({
    success: true,
    order,
    // orderOptions,
  });
};

export const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });


    // await Order.create({
    //   ...orderOptions,// create a new schema  , which i received  from orderOptions
    //   //  user: "req.user._id",// ! for the API testing on postman --> use this line otherwise comment out this line mean // MEAN FOR API USE --> user: "req.user._id"
    //   paidAt: new Date(Date.now()), // paidAt present in Payment schema
    //   paymentInfo: payment._id,//paymentInfo from Order.js schema
    // });


//     res.redirect(
// `https://razorpay-intregaction-via-node-react-001.onrender.com`
//       // `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
//     );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
