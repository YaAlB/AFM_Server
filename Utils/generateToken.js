const jwt = require('jsonwebtoken')

const generateToken = (res, user) => {

  const accessToken = jwt.sign(
    {
        "UserInfo": {
            "id": user._id
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, // Use secure cookies in production -> https
        sameSite: 'None', //cross-site cookie and 'strict' Prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to 7 days
    })

    return accessToken
};

module.exports = generateToken