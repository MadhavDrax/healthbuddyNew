const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Review = require('../models/Review');
const AdminLog = require('../models/AdminLog');
const adminAuth = require('../middleware/adminAuth');

// Generate Statistics for Admin Dashboard
router.get('/admin/stats', adminAuth, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const activeUsers = await User.countDocuments({ role: 'user', status: 'Active' });
        
        const reviews = await Review.find();
        const totalReviews = reviews.length;
        
        // Calculate average
        const ratedReviews = reviews.filter(r => r.rating);
        let averageRating = 0;
        if (ratedReviews.length > 0) {
            const sum = ratedReviews.reduce((acc, curr) => acc + curr.rating, 0);
            averageRating = (sum / ratedReviews.length).toFixed(1);
        }

        res.json({
            totalUsers,
            activeUsers,
            totalReviews,
            averageRating: parseFloat(averageRating)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all standard users for User Management
router.get('/admin/users', adminAuth, async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user's status (Active / Suspended)
router.put('/admin/users/:id/status', adminAuth, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Active', 'Suspended'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ error: 'Cannot modify another administrator' });
        }

        user.status = status;
        await user.save();
        
        // Log action
        await AdminLog.create({
            action: status === 'Active' ? 'USER_ACTIVATED' : 'USER_SUSPENDED',
            description: `Admin changed status of ${user.userName || user.email} to ${status}.`,
            admin: req.user._id,
            targetUser: user._id
        });

        res.json({ message: 'User status updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user entirely
router.delete('/admin/users/:id', adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.role === 'admin') {
            return res.status(403).json({ error: 'Cannot delete an administrator' });
        }

        // Log action before deletion
        await AdminLog.create({
            action: 'USER_DELETED',
            description: `Admin permenantly deleted user ${user.userName || user.email}.`,
            admin: req.user._id,
            targetUser: user._id
        });

        // Clean up reviews if a user is deleted
        await Review.deleteMany({ user: user._id });
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get recent system logs
router.get('/admin/logs', adminAuth, async (req, res) => {
    try {
        const logs = await AdminLog.find()
            .populate('admin', 'userName email')
            .populate('targetUser', 'userName email')
            .sort({ createdAt: -1 })
            .limit(100);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
