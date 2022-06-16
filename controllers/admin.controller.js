const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const json = require('../helpers/jsonresponse');
const Admin = require('../models').admin;
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs');

//login API
// router.options("/login", cors());
router.post('/login', cors(), async (req, res) => {
    const { email, password } = req.body;
    let data;
    if (!email || !password) return json(res, 500, `Interval Server error`)
    const isFound = await Admin.findOne({ where: { email } });

    bcrypt.compare(password, isFound.toJSON().password, function (err, res_) {
        if (!res_) {
            return json(res, 404, "Invalid Credentials")
        } else {
            data = isFound
            data = data.toJSON();
            const accessToken = jwt.sign({ email, id: data.id, role: data.role }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRE}` });
            res.status(200).json({ status: 200, accessToken })
        }
    });
})

module.exports = router;

