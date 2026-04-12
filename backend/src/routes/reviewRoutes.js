const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const AdminLog = require('../models/AdminLog');

// Create a new review (Protected by user auth)
router.post('/reviews', auth, async (req, res) => {
    try {
        const review = new Review({
            ...req.body,
            user: req.user._id
        });
        await review.save();

        // Log the activity for the admin
        await AdminLog.create({
            action: 'REVIEW_SUBMITTED',
            description: `User ${req.user.userName || req.user.email} submitted a new ${req.body.type || 'review'}.`,
            targetUser: req.user._id
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all reviews (Protected by admin auth)
router.get('/reviews', adminAuth, async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate('user', 'userName email')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
