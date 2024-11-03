const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = verifiedToken.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
}