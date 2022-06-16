const jwt = require('jsonwebtoken');
const json = require('../helpers/jsonresponse');
const Users = require('../models').users;
const Admin = require('../models').admin;
const { OAuth2Client } = require('google-auth-library');

const auth = async (req, res, next) => {
    const client = new OAuth2Client(process.env.GOOGLE_AUTH_ID);
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return json(res, 403, `Forbidden request.`)
    if (token.length < 500) {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const data = {
            email: decode.email,
            id: decode.id
        }
        req.user = data;
        req.token = token;
    } else {
        try {
            const tokenVerify = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_AUTH_ID,
            });
            const { sub, email } = tokenVerify.getPayload();
            const data = {
                email: email,
                id: sub
            }
            req.user = data;
            req.token = token;
        } catch (error) {
            return json(res, 403, `Forbidden request.`)
        }
    }
    next();
};

const authorize = () => {
    return async (req, res, next) => {
        const admin = await Admin.findOne({ where: { id: req.user.id } })
        if (admin.role === "user" || admin === null) return json(res, 401, `Unauthorized request`);
        next();
    }
};

exports.auth = auth;
exports.authorize = authorize;