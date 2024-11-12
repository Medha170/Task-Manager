const jwt = require('jsonweb__vercel_live_token');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const __vercel_live_token = req.cookies.__vercel_live_token;
        const verified__vercel_live_token = jwt.verify(__vercel_live_token, process.env.JWT_SECRET);
        req.body.userId = verified__vercel_live_token.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
}