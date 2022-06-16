const express = require('express');
const router = express.Router();
const json = require('../helpers/jsonresponse');
const { auth, authorize } = require('../middleware/auth');
const Coupon = require('../models').coupon;

//get all coupons
router.get('/all', auth, authorize(), async (req, res) => {
    let data = await Coupon.findAll()
    data.map(item => {
        item = item.toJSON()
        if (item.expiry_date < Date.now()) {
            Coupon.update({ status: "yes" }, { where: { coupon_code: item.coupon_code } })
        }
    })
    data = await Coupon.findAll()
    json(res, 200, '', data)
})

// Create coupon
router.post('/new', auth, authorize(), async (req, res) => {
    req.body.used = 0
    const isCoupon = await Coupon.findOne({ where: { coupon_code: req.body.coupon_code } })
    if (isCoupon) return json(res, 409, 'Coupon Code Already exists')
    try {
        await Coupon.create(req.body)
    } catch (error) {
        return json(res, 500, error.message)
    }
    json(res, 201, 'Coupon Code created successfully')
})

// Apply coupon
router.put('/apply', async (req, res) => {
    const { coupon } = req.query;
    let isCoupon = await Coupon.findOne({ where: { coupon_code: coupon } })
    if (!isCoupon) return json(res, 404, 'Invalid Coupon')
    isCoupon = isCoupon.toJSON();

    if (isCoupon.expiry_date < Date.now() || isCoupon.usage <= 0 || isCoupon.frames_valid <= 0) {
        await Coupon.update({ status: "yes" }, { where: { coupon_code: coupon } })
        return json(res, 500, 'Coupon expired')
    }
    json(res, 202, "", { coupon_code: isCoupon.coupon_code, discount: isCoupon.discount,type:isCoupon.type })
})

router.delete('/:id', auth, authorize(), async (req, res) => {
    const { id } = req.params
    await Coupon.destroy({ where: { id } })
    json(res, 200, 'Deleted')
})

module.exports = router;