const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization; // Get the authorization header
    const token = authHeader && authHeader.split(" ")[1]; // Get the token from the header

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // Attach user information to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(403).json({ message: "Invalid token." });
    }
}

//verify token and admin
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(403).json({ message: "Admin resource! Access denied." });
        }
    });
}

module.exports = { verifyToken, verifyTokenAndAdmin };
