const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "Secret";



const authenticateToken = (req, res, next)=>{
const authHeader = req.headers['authorization'];
const token = authHeader?.split(" ")[1];

if(!token) return res.status(401).json({error: " No token provided"});

jwt.verify(token, JWT_SECRET, (err, decoded)=>{
    if(err) return res.status(403).json({error: " Invlaid Token"})
        req.user = decoded;
    next()
})
};





module.exports = authenticateToken;