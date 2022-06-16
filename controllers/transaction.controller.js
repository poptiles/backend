const express = require('express');
const router = express.Router();
const json = require('../helpers/jsonresponse');
const { auth, authorize } = require('../middleware/auth');
const Transactions = require('../models').transactions;

router.get('/', auth, authorize(), async (req, res) => {
    const data = await Transactions.findAll()
    json(res, 200, '', data);
})

module.exports = router;