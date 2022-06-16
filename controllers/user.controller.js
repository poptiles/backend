const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const json = require('../helpers/jsonresponse');
const Users = require('../models').users;


//login API
router.post('/login', async (req, res) => {
    const { email, fullname, imageUrl } = req.body;
    let data;
    if (!email) return json(res, 500, `Interval Server error`)
    const isFound = await Users.findOne({ where: { email } });
    data = isFound
    if (!isFound) {
        data = await Users.create({ email, fullname, imageUrl, role: 'user' });
    }
    data = data.toJSON();
    const accessToken = jwt.sign({ email, id: data.user_id }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRE}` });
    delete data["role"];
    res.status(200).json({ status: 200, data, accessToken })
})

module.exports = router;




//login API
// router.post('/login', async (req, res) => {
    //     const { email } = req.body;
    //     if (email === undefined) return json(res, 500, `Interval Server error`)
//     const verify_code = Math.floor(Math.random() * 8999) + 999;
//     const role = ''
//     const isFound = await Users.findOne({
//         where: { email },
//         attributes: {
//             exclude: ['updatedAt', 'createdAt']
//         }
//     });
//     if (isFound === null) {
//         await Users.create({ email, verify_code, role: 'user' });
//     } else {
//         await Users.update({ verify_code }, { where: { email: email } });
//     }
//     const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRE}` });
//     sendEmail({ email: email, subject: 'Poptiles SignIn code', text: `SignIn code ${verify_code}` })
//     res.status(202).json({ status: 202, message: `Code sent to email`, accessToken })
// })


//Verify Code API
// router.post('/verify', auth, async (req, res) => {
//     const { verify_code } = req.body;
//     if (verify_code === undefined) return json(res, 500, `Interval Server error`)
//     const isFound = await Users.findOne({ where: { email: req.user.email } });
//     const user = isFound.toJSON();
//     if (user.verify_code === verify_code) {
//         return json(res, 202, `Code Verified`)
//     } else {
//         return json(res, 500, `Invalid Code`)
//     }
// })
