const express = require('express');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const error = require('../middleware/error')
const bannerController = require('../controllers/banner.controller')
const userController = require('../controllers/user.controller')
const adminController = require('../controllers/admin.controller')
const giftController = require('../controllers/gift.controller')
const orderController = require('../controllers/order.controller')
const photoController = require('../controllers/photo.controller')
const promoController = require('../controllers/promo.controller')
const invalidController = require('../controllers/invalid_routes')
const transController = require('../controllers/transaction.controller')

module.exports = function (server) {
    server.use(cors({
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        origin: '*'
    }))
    server.use(express.static('public'));
    server.use('/images', express.static('public/assets/upload/ordered_tiles'));
    server.use(bodyParser.json({ limit: '50mb' }));
    server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    server.use(fileUpload({ useTempFiles: false, tempFileDir: 'public' }));
    server.use(express.json());
    server.use('/api/v1/admin', adminController);
    server.use('/api/v1/user', userController);
    server.use('/api/v1/gift', giftController);
    server.use('/api/v1/order', orderController);
    server.use('/api/v1/order', photoController);
    server.use('/api/v1/coupon', promoController);
    server.use('/api/v1/banner', bannerController);
    server.use('/api/v1/transaction', transController);
    server.use('*', invalidController);
    server.use(error);
}
