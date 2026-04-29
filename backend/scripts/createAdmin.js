require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const connectDB = require('../src/config/database');

const createAdmin = async () => {
  try {
    await connectDB();

    const email = 'admin@recipenest.com';
    const password = 'AdminPassword123!';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists:', email);
      process.exit(0);
    }

    // Create new admin
    const newAdmin = new User({
      firstName: 'Super',
      lastName: 'Admin',
      email: email,
      username: 'superadmin',
      passwordHash: password, // Pre-save hook hashes this
      role: 'admin',
      isEmailVerified: true,
      isActive: true,
    });

    await newAdmin.save();
    console.log(`\n✅ Admin account successfully created!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}\n`);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
