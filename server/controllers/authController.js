const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret";



// -> /signup - Users
    exports.signUp = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
        return res.status(400).json({ message: "All fields required" });
        }

        // step 2: check for exisiting user
        const exisitingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email: email }, { username: username }],
        },
        });

        if (exisitingUser) {
        return res
            .status(409)
            .json({ message: "Email or username already in use." });
        }

    // step 3: hash the passowrd
    const hashPassword = await bcrypt.hash(password, 10);

    // step 1: create newUser
        const newUser = await prisma.user.create({
        data: {
            email,
            username,
            password: hashPassword,
        },
        });

        res.json({
        user_id: newUser.user_id,
        username: newUser.username,
        email: newUser.email,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during signup." });
    }
    };

// -> /login - Users
    exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // step 1: find user in db(by email)
        const user = await prisma.user.findUnique({where: {email}});
        if(!user) return res.status(400).json({ error: 'Invalid Credentials'})
        // step 2: find if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({error: 'Invalid Credentials'});
        // step 3: create a tokem with jwt
        const token = jwt.sign({user_id: user.user_id}, JWT_SECRET, {expiresIn: '1d'});

        res.json({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            token,
            message: 'Login Successful'
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to login" });
    }
    };

    exports.logout = (req, res) => {
        res.json({ message: 'Logout handled on client side. Just delete the token.' });
    };
      