const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const { sendResetOtp } = require('../utils/mailer');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'healthbuddy_fallback_secret', { expiresIn: '7d' });
};

// Signup
router.post('/auth/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === 11000) {
       return res.status(400).json({ error: 'Email already in use' });
    }
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }
        
        if (user.status === 'Suspended') {
            return res.status(403).json({ error: 'Account Suspended. Please contact administration.' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const token = generateToken(user._id);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin Login
router.post('/auth/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ error: 'Invalid admin credentials' });
        }
        
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Account is not an administrator.' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid admin credentials' });
        }

        const token = generateToken(user._id);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Forgot Password
router.post('/auth/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User with this email does not exist' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        user.resetPasswordOtp = otp;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        await sendResetOtp(email, otp);

        res.json({ message: 'OTP sent to email successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify OTP
router.post('/auth/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({
            email,
            resetPasswordOtp: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        res.json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Reset Password
router.post('/auth/reset-password', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({
            email,
            resetPasswordOtp: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        user.password = newPassword;
        user.resetPasswordOtp = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get current user profile (protected)
router.get('/users/me', auth, async (req, res) => {
    res.json(req.user);
});

// Get all users (protected)
router.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update current user
router.put('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['userName', 'age', 'weight', 'height', 'bloodGroup', 'country', 'password', 'avatar', 'oldPassword'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).json({ error: 'Invalid updates!' });
  }

  try {
    // If password is being updated, verify old password first
    if (req.body.password) {
      if (!req.body.oldPassword) {
        return res.status(400).json({ error: 'Please provide your current password to set a new one.' });
      }
      
      const isMatch = await bcrypt.compare(req.body.oldPassword, req.user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect.' });
      }
    }

    updates.forEach((update) => {
      if (update !== 'oldPassword') {
        req.user[update] = req.body[update];
      }
    });

    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete current user
router.delete('/users/me', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;