const express = require('express');
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const router = express.Router();


router.post('/register', async (req, res) => {
    const data = req.body;
    // Validate request parameters
    if (!data.username || !data.email || !data.password) {
        return res.status(400).json({ error: 'Validation failed.', details: ['Username, email, and password are required.'] });
    }

    try {
        // check is use is alradey exist
        const user = await User.findOne({ email: data.email });
        if (user) {
            return res.status(400).json({ error: 'User already exists.' });

        } else {
            // Create new user

            const newUser = await User.create(data);
            data.userInfo._id = newUser._id;
            const newUserInfo = new UserInfo(data.userInfo);
            await newUserInfo.save();

            res.status(201).json({ message: 'User registered successfully.', userId: newUser._id.toString() });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

// User login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email and password in MongoDB
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }
        res.json({ message: 'Login successful.', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

router.get('/profile', async (req, res) => {
    // console.log(req.user);
    try {
        // Find user by email in MongoDB
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const userInfo = await UserInfo.findById(req.user._id);
        res.json({ user, userInfo });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }

});

module.exports = router;