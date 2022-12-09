const express = require('express');
const router = express.Router()

const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const User = require('../models/User');
const verifyToken = require('../middleware/auth');

//Check if user is logged in
//public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) return res.status(400).json({ success: false, message: "User Not Found" })

        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    //Check username
    if (!username) {
        return res.status(400).json({ success: false, message: "Username are missing" })
    }

    //Check password
    if (!password)
        return res.status(400).json({ success: false, message: "Password are missing" })


    try {
        //Check existing user by username
        const user = await User.findOne({ username })
        //If username exist
        if (user) {
            return res.status(400).json({ success: false, message: "User already taken" })
        }

        // if not
        const hashedPassword = await argon2.hash(password)

        //Create new user
        const newUser = new User({
            username,
            password: hashedPassword
        })
        //Wait until create is done then save to database
        await newUser.save()

        //Return token {id and accessToken}
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)

        res.json({ success: true, message: "User created successfully", accessToken })

    } catch (error) {
        console.log(error.message)
    }
})

//Login
router.post('/login', async (req, res) => {
    //Get username and password from POST 
    const { username, password } = req.body


    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username or password are missing" })
    }

    try {
        //Check exist username
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ success: false, message: "Incorrect username" })
        }

        //If username is not exist
        //Check validate password
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) {
            return res.status(400).json({ success: false, message: "Incorrect password" })
        }


        const accessToken = jwt.sign({
            userId: user._id
        }, process.env.ACCESS_TOKEN_SECRET)

        res.json({ success: true, message: "Logged in successfully", accessToken })


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Server error" })
    }
})

module.exports = router