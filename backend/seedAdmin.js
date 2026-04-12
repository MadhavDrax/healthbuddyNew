const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@healthbuddy.com';
    
    // Drop the problematic index if it exists
    try {
      await User.collection.dropIndex('sessionId_1');
      console.log('Dropped problematic sessionId index on users collection');
    } catch (e) {
      // Ignore if index doesn't exist
    }

    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      console.log('Admin user already exists. Updating role to admin just to be sure.');
      admin.role = 'admin';
      // For testing, force password reset to ensure we know it
      admin.password = await bcrypt.hash('adminPassword123', 8);
      
      // Mongoose save middleware skips hashing if password is set manually without isModified returning true in typical setups, 
      // but since we pre-hash it here, we should be fine, but let's just use updateOne to be safer since our pre-save hook is:
      // if (user.isModified('password')) { user.password = await bcrypt.hash(user.password, 8); }
      // So if we just set admin.password = 'adminPassword123', the pre-save hook will hash it.
      admin.password = 'adminPassword123';
      await admin.save();
      console.log('Admin user updated (email: admin@healthbuddy.com, password: adminPassword123)');
    } else {
      admin = new User({
        userName: 'System Administrator',
        age: 30,
        weight: 70,
        height: 175,
        bloodGroup: 'O+',
        country: 'USA',
        email: adminEmail,
        password: 'adminPassword123',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user seeded successfully (email: admin@healthbuddy.com, password: adminPassword123)');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
