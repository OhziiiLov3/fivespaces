const experss = require("express");
const router = experss.Router();
const {signUp, login, logout} = require("../controllers/authController");


// POST -> /auth/signup
router.post('/signup', signUp);
router.post('/login', login);
router.post('/login', logout);







module.exports = router;