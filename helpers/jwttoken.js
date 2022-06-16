const sendToken = (res, statusCode, token, message, user) => {

    //cookie
    const options = {
        expires: new Date(
            Date.now() + (process.env.COOKIE_EXPIRE * 1000 * 60 * 60 * 24 * 365)
        ),
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    };
    res.status(statusCode).cookie('token', token, options).json({
        status: statusCode,
        message,
        user,
        token
    });
}

module.exports = sendToken;