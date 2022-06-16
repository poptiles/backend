const express = require('express');
const router = express.Router();
const json = require('../helpers/jsonresponse');
const { auth, authorize } = require('../middleware/auth');
const Order = require('../models').order;
const Photos = require('../models').photos;
const Coupon = require('../models').coupon;
const Order_Price = require('../models').order_price;
const Transactions = require('../models').transactions;
const shortid = require('shortid')
const Razorpay = require('razorpay')


let images = null
let order_data = null
let orderNumber = null
let orderNumber_ = null
let user_id = null
let amt = null
let email = null
let pid = null
let coupon_code = null
const date = new Date();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


//get all Orders
// router.get('/all', async (req, res) => {
router.get('/all', auth, authorize(), async (req, res) => {
    let orders
    try {
        orders = await Order.findAll();
    } catch (error) {
        return json(res, 500, error.message)
    }
    json(res, 200, '', orders);
})

//get single Order
router.get('/me', auth, async (req, res) => {
    const orders = await Order.findAll({ where: { user_id: req.user.id } });
    if (orders.length === 0) return json(res, 404, 'No order found');
    json(res, 200, '', orders);
})

//Post Order
router.post('/new', auth, async (req, res) => {
    coupon_code = req.body.coupon_code;
    user_id = req.user.id
    images = req.body.images;
    order_data = req.body.order_data
    email = req.body.email
    pid = req.body.pid

    createOrder();
    if (coupon_code != 'null') {
        applyCoupon();
    }
    console.log(orderNumber_);
    json(res, 201, "Order Accepted", { orderNumber: orderNumber_ });
})

//Update Order
// router.put('/', async (req, res) => {
router.put('/', auth, authorize(), async (req, res) => {
    const { order_no } = req.query
    const isFound = await Order.findOne({ where: { order_no } })
    if (!isFound) return json(res, 404, 'Invalid Order ID')
    try {
        await Order.update(req.body, { where: { order_no } });
    } catch (error) {
        return json(res, 500, error.message)
    }
    json(res, 202, 'Order updated successfully');
})


//get order Price
// router.get('/price', async (req, res) => {
router.get('/price', async (req, res) => {
    const price = await Order_Price.findOne({ where: { id: 1 } })
    json(res, 200, '', price)
})

// update order prices
// router.put('/price', async (req, res) => {
router.put('/price', auth, authorize(), async (req, res) => {
    const isPrice = await Order_Price.findOne({ where: { id: 1 } })
    try {
        if (!isPrice) {
            await Order_Price.create(req.body);
        } else {
            await Order_Price.update(req.body, { where: { id: 1 } });
        }
    } catch (error) {
        return json(res, 500, error.message)
    }
    json(res, 202, 'Prices updated successfully')
})

//create order
const createOrder = async () => {
    order_data["tracking_id"] = 0
    delete order_data["images"]
    let isPrice = await Order_Price.findOne({ where: { id: 1 } })
    isPrice = isPrice?.toJSON();
    let data = order_data;
    data = { ...data, price: amt, user_id }
    try {
        let ord = await Order.create(data);
        ord = ord.toJSON();
        orderNumber = ord.order_no
        for (let index = 0; index < images.length; index++) {
            await Photos.create({ photo_name: images[index], order_no: orderNumber })
        }
        transactions(orderNumber)
        orderNumber_ = ord.order_no
    } catch (error) {
        console.log(error)
    }
}

//apply Coupon
const applyCoupon = async () => {
    let isCoupon = await Coupon.findOne({ where: { coupon_code } })
    isCoupon = isCoupon.toJSON();
    await Coupon.update({ usage: isCoupon.usage - 1, frames_valid: isCoupon.frames_valid - 1, used: isCoupon.used + 1 }, { where: { coupon_code } })
}

//transaction
const transactions = async (order) => {
    await Transactions.create({
        order_id: order,
        email: email,
        PID: pid,
        amount: amt,
        date: Date.now(),
    })
}


// Razor pay Verification
router.post('/verification', (req, res) => {
    // do a validation
    const secret = '12345678'
    const crypto = require('crypto')
    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')
    console.log(digest, req.headers['x-razorpay-signature'])
    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        // process it
        require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else {
        // pass it
    }
    res.json({ status: 'ok' })
})


// RazorPay
router.post('/payment', async (req, res) => {
    amt = req.body.amount
    const payment_capture = 1
    const amount = req.body.amount
    const currency = 'INR'
    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    try {
        const response = await razorpay.orders.create(options)
        res.status(201).json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;