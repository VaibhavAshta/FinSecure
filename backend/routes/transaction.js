const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Category = require('../models/Category');
const UserInfo = require('../models/UserInfo');
const User = require('../models/User');


router.post('/', authenticateToken, async (req, res) => {
    const dataList = req.body.List;
    const userId = await User.findOne({ email: req.user.email });
    const userInfo = await UserInfo.findById({ _id: userId._id });
    try {
        // reverse loop
        for (let i = dataList.length - 1; i >= 0; i--) {
            const data = dataList[i];
            const transaction = await Transaction.create(data);
            userInfo.transaction.push(transaction._id);
        }
        await userInfo.save();
        res.status(201).json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const userInfo = await UserInfo.findById({ _id: req.user._id })
    const transactions = await Transaction.find({ _id: { $in: userInfo.transaction } }).populate('category').sort('-date')
    try {
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});