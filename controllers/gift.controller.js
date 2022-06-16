const express = require('express');
const router = express.Router();
const json = require('../helpers/jsonresponse');
const sendEmail = require('../helpers/sendemail');
const { auth, authorize } = require('../middleware/auth');
const SendGifts = require('../models').sendgifts;
const GiftPrice = require('../models').giftprices;

//Send Gift API
router.post('/send', async (req, res) => {
    const { to_email, tiles, from_email } = req.body;
    try {
        await SendGifts.create(req.body);
    } catch (error) {
        return json(res, 500, error.message)
    }
    sendEmail({ email: to_email, subject: 'Poptiles Gift Card', text: `${from_email} sent you ${tiles} Tiles as a gift.` })
    json(res, 201, `Gift sent successfully`);
})

//Get Gift API
router.get('/all', auth, authorize(), async (req, res) => {
    const gifts = await SendGifts.findAll();
    if (gifts.length === 0) return json(res, 404, 'No data found')
    json(res, 200, '', gifts);
})

//get gift Price
router.get('/price', async (req, res) => {
    const price = await GiftPrice.findOne({ where: { id: 1 } })
    json(res, 200, '', price)
})

// update order prices
router.put('/price', auth, authorize(), async (req, res) => {
    const isPrice = await GiftPrice.findOne({ where: { id: 1 } })
    try {
        if (!isPrice) {
            await GiftPrice.create(req.body);
        } else {
            await GiftPrice.update(req.body, { where: { id: 1 } });
        }
    } catch (error) {
        return json(res, 500, error.message)
    }
    json(res, 202, 'Prices updated successfully')
})

module.exports = router;