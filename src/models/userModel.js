const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: {
      validator: async function (email) {
        const existingUser = await mongoose.models.User.findOne({ email });
        return !existingUser; // Returns false if email already exists
      },
      message: "User with this email already exist",
    },
  },
  password: { type: String },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
